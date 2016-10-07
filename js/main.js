window.onload = function() {
    cm.app.slide();
    cm.app.productDetail();
    cm.app.tipsBar();

    cm.app.login();
    cm.app.follow();
    cm.app.coures();
    cm.app.hotList();

    (function() {
        // 关闭弹窗
        var oModal = cm.tool.gel('.m-modal');
        var oClose = cm.tool.gel('.m-modal .close');
        var oVideo_v = cm.tool.gel('.j-modalVideo video')[0];

        for (var i = 0; i < oClose.length; i++) {
            oClose[i].addEventListener('click', function() {
                for (var i = 0; i < oModal.length; i++) {
                    oModal[i].style.display = 'none';
                    oVideo_v.pause();
                }
            }, false);
        }


        // 判断是否登录
        function checkLogin() {
            if (cm.tool.getCookie('loginSuc')) {
                if (cm.tool.getCookie('followSuc')) {
                    cm.ui.follow.follow();
                } else {
                    cm.ui.follow.cancel();
                }
            }
        }
        checkLogin();

        // 显示视频弹窗
        var oVideoModal = cm.tool.gel('.j-modalVideo')[0];
        var oVide = cm.tool.gel('.j-video')[0];
        oVide.addEventListener('click', function() {
            oVideoModal.style.display = 'block';
        }, false);
    })();
};

// 命名空间，避免全局变量
var cm = {};

// 工具方法
cm.tool = {
    gid: function(id) {
        return document.getElementById(id);
    },
    gel: function(selector, parent) {
        return (parent || document).querySelectorAll(selector);
    },
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    /**
     ajax({
        method: 'POST',
        url: 'test.php',
        data: {
            name1: 'value1',
            name2: 'value2'
        },
        success: function (response) {
           console.log(response)；
        }
    });
     */
    ajax: function(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function() {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data) {
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        };
    },

    /**
     *
     * MD5 (Message-Digest Algorithm)
     * http://www.webtoolkit.info/
     *
     **/
    MD5: function(string) {
        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        function G(x, y, z) {
            return (x & z) | (y & (~z));
        }

        function H(x, y, z) {
            return (x ^ y ^ z);
        }

        function I(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue = "",
                WordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
        string = Utf8Encode(string);
        x = ConvertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }
        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
        return temp.toLowerCase();
    },

    getStyle: function(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

};

// ui通用组件
cm.ui = {
    /**
     * 幻灯片
     * @param obj 幻灯片容器
     */
    slide: function(obj) {
        var aItem = cm.tool.gel('li', obj);
        var aSpan = cm.tool.gel('span', obj);
        var curIndex = 0;
        var len = aItem.length;
        var timer = null;

        function init() {
            for (var i = len - 1; i >= 0; i--) {
                aItem[i].style.zIndex = len - i;
            }
        }

        init();

        for (var i = 0; i < len; i++) {
            aSpan[i].index = i;
            aSpan[i].addEventListener('click', function() {
                curIndex = this.index;
                tab();
            }, false);
        }

        obj.addEventListener('mouseover', function() {
            clearInterval(timer);
        }, false);
        obj.addEventListener('mouseout', function() {
            auto();
        }, false);

        function tab() {
            for (var i = 0; i < len; i++) {
                aSpan[i].className = '';
                aItem[i].style.zIndex = 1;
                aItem[i].className = 'item';
            }

            aSpan[curIndex].className = 'cur';
            aItem[curIndex].style.zIndex = 10;
            aItem[curIndex].className = 'item cur';
        }

        function auto() {
            timer = setInterval(function() {
                curIndex++;
                if (curIndex > len - 1) {
                    curIndex = 0;
                }
                tab();
            }, 5000);
        }

        auto();

    },
    // 登录弹窗
    loginModal: (function() {

        var oLoginModal = cm.tool.gel('.j-modalLogin')[0];
        var oLoginModalInput = cm.tool.gel('.j-modalLogin input')[0];

        var show = function() {
            oLoginModal.style.display = 'block';
            oLoginModalInput.focus();
        }

        var hide = function() {
            oLoginModal.style.display = 'none';
        }

        return {
            show: show,
            hide: hide
        }
    })(),
    // 关注
    follow: (function() {

        var oFollow = cm.tool.gel('.j-follow')[0];
        var oCancel = cm.tool.gel('.j-cancel')[0];
        var cookie = cm.tool.getCookie('followSuc');

        var follow = function() {
            cm.tool.setCookie('followSuc', 1, 30);
            oCancel.style.display = 'inline-block';
            oFollow.style.display = 'none';
        }

        var cancel = function() {
            cm.tool.setCookie('followSuc', 0, -1);
            oCancel.style.display = 'none';
            oFollow.style.display = 'inline-block';
        }

        return {
            follow: follow,
            cancel: cancel,
            isFollow: cookie
        }
    })()
};

// 页面应用
cm.app = {
    // 幻灯片
    slide: function() {
        cm.ui.slide(cm.tool.gid('j-slide'));
    },
    // 产品移入显示详情
    productDetail: function() {
        var aItem = cm.tool.gel('.j-productList .item .pic');
        var timer = null;
        var targetParent = null;
        var targetDetail = null;

        for (var i = 0; i < aItem.length; i++) {

            aItem[i].addEventListener('mouseover', function() {

                if (targetParent && targetDetail) {
                    clearTimeout(timer);
                    targetParent.style.position = 'inherit';
                    targetDetail.style.display = 'none';
                }

                var _this = this;

                var parent = _this.parentElement.parentElement;
                var detail = _this.parentElement.nextElementSibling.nextElementSibling;

                targetParent = parent;
                targetDetail = detail;

                parent.style.position = 'relative';
                detail.style.display = 'block';

                detail.addEventListener('mouseover', detailOver, false);
                detail.addEventListener('mouseout', detailOut, false);

                function detailOver() {
                    console.log('over');
                    clearTimeout(timer);
                }

                function detailOut() {
                    timer = setTimeout(function() {
                        detail.style.display = 'none';
                        parent.style.position = 'inherit';
                        console.log('out');

                        detail.removeEventListener('mouseover', detailOver);
                        detail.removeEventListener('mouseout', detailOut);
                    }, 1);

                }


            }, false);

        }
    },
    // 顶部通知条
    tipsBar: function() {
        var oTipsBar = cm.tool.gel('.j-tipsBar')[0];
        var oClose = cm.tool.gel('.j-tipsClose')[0];
        var cookie = cm.tool.getCookie('isShow');

        if (cookie != '') {
            oTipsBar.style.display = 'none';
        } else {
            oTipsBar.style.display = 'block';
        }

        oClose.addEventListener('click', function() {
            cm.tool.setCookie('isShow', 0, 30);
            oTipsBar.style.display = 'none'
        }, false);

    },
    // 登录
    login: function() {
        var oLoginModal = cm.tool.gel('.j-modalLogin')[0];
        var aInput = cm.tool.gel('.j-modalLogin input');

        function valide() {
            var result = true;

            var str1 = aInput[0].value;
            var str2 = aInput[1].value;

            if (str1.length == 0) {
                alert('请输入用户名！');
                result = false;
                return result;
            }
            if (str2.length == 0) {
                alert('请输入密码！');
                result = false;
                return result;
            }


            return result;
        }

        aInput[1].addEventListener('keyup', function(ev) {
            if (ev.keyCode == 13) {
                aInput[2].click();
            }
        }, false);

        aInput[2].addEventListener('click', function() {

            if (valide()) {

                cm.tool.ajax({
                    method: 'GET',
                    url: 'http://study.163.com/webDev/login.htm',
                    data: {
                        userName: cm.tool.MD5(aInput[0].value),
                        password: cm.tool.MD5(aInput[1].value)
                    },
                    success: function(response) {
                        if (response == 1) {
                            cm.tool.setCookie('loginSuc', 1, 30);
                            alert('登录成功！');
                            oLoginModal.style.display = 'none';


                            if (!cm.ui.follow.isFollow) {
                                cm.ui.follow.follow();
                            }
                        } else {
                            alert('用户名或密码错误！');
                        }
                    }
                });
            }

        }, false);
    },
    // 关注
    follow: function() {
        var isLogin = cm.tool.getCookie('loginSuc');
        var btnFollow = cm.tool.gel('.j-follow')[0];
        var btnCancel = cm.tool.gel('.j-cancel em')[0];

        btnFollow.addEventListener('click', function() {
            console.log(isLogin);
            if (isLogin == '') {
                cm.ui.loginModal.show();
            } else {
                cm.ui.follow.follow();
            }
        }, false);

        btnCancel.addEventListener('click', function() {
            cm.ui.follow.cancel();
        }, false);
    },
    // 获取课程列表
    coures: function() {
        var oCouresTabs = cm.tool.gel('.j-couresTabs li');
        var oProductList = cm.tool.gel('.j-productList')[0];
        var oPage = cm.tool.gel('.j-page')[0];
        var url = 'http://study.163.com/webDev/couresByCategory.htm';
        var pageNo = 1;
        var psize = 20;
        var type = 10;

        var totalCount = 0;
        var totalPage = 0;
        var pagination = {};
        var list = []

        getData(pageNo, psize, type);

        function getData(pageNo, psize, type) {
            cm.tool.ajax({
                method: 'GET',
                url: url,
                data: {
                    pageNo: pageNo,
                    psize: psize,
                    type: type
                },
                success: function(response) {
                    arrData = JSON.parse(response);
                    totalCount = arrData.totalCount;
                    totalPage = arrData.totalPage;
                    pagination = arrData.pagination;
                    list = arrData.list;

                    fillList(list);
                }
            });
        }

        function fillList(arrData) {
            // {
            //   “totalCount”: 80,//返回的数据总数
            //   “totalPage”: 8,//返回的数据总页数
            //   “pagination”: {
            //  “pageIndex” : 1, //当前页码
            //  “pageSize” : 10, //每页的数据个数
            //  “totlePageCount”: //总页数
            //               },
            //   “list” : [{"id":"967019",//课程ID
            //   "name":"和秋叶一起学职场技能",//课程名称
            //   "bigPhotoUrl":"http://img1.ph.126.net/eg62.png",//课程大图
            //   " middlePhotoUrl ":"http://img1.ph.126.net/eg62.png",//课程中图
            //   "smallPhotoUrl":" http://img1.ph.126.net/eg62.png ",//课程小图
            //   " provider ":"秋叶",//机构发布者
            //   " learnerCount ":"23",//在学人数
            //   " price ":"128",//课程价格，0为免费
            //   "categoryName ":"办公技能",//课程分类
            //   "description ":"适用人群：最适合即将实习、求职、就职的大学生，入职一、二三年的新人。别以为那些职场老人都知道！"//课程描述
            //  }]
            //  }
            var listHTML = '';

            for (var i = 0; i < arrData.length; i++) {
                listHTML += '<li class="item">\
                        <a href="#"><img class="pic" width="223" height="124" src="' + arrData[i].middlePhotoUrl + '" alt=""></a>\
                        <div class="text">\
                            <p class="title f-toe"><a href="javascript:;">' + arrData[i].name + '</a></p>\
                            <p class="tag">' + arrData[i].provider + '</p>\
                            <p><span class="people"><i class="u-icon u-icon-people"></i>' + arrData[i].learnerCount + '</span></p>\
                            <p class="price">￥' + arrData[i].price + '</p>\
                        </div>\
                        <div class="detail">\
                            <div class="bd f-clearfix">\
                                <img width="223" height="124" src="' + arrData[i].middlePhotoUrl + '" alt="">\
                                <h3><a href="#">' + arrData[i].name + '</a></h3>\
                                <p><i class="u-icon u-icon-people"></i> ' + arrData[i].learnerCount + '人在学</p>\
                                <p>发布者：' + arrData[i].provider + '</p>\
                                <p>分类： ' + arrData[i].categoryName + '</p>\
                            </div>\
                            <div class="text">\
                                <div>' + arrData[i].description + '</div>\
                            </div>\
                        </div>\
                    </li>';
            }

            oProductList.innerHTML = '';
            oProductList.innerHTML = listHTML;

            cm.app.productDetail();

            // TODO js分页
            // var pageHTML = '<li class="pre"><a href="javascript:;">&nbsp;</a></li>';
            // for(var i=1;i<pagination.pageSize+1;i++){
            //     if(i == pagination.pageIndex){
            //         pageHTML += '<li class="cur"><a href="javascript:;">'+ i +'</a></li>';
            //     }else{
            //         pageHTML += '<li><a href="javascript:;">'+ i +'</a></li>';
            //     }             
            // }
            // pageHTML += '<li class="next"><a href="javascript:;">&nbsp;</a></li>';
            // oPage.innerHTML = '';
            // oPage.innerHTML = pageHTML;
        }

        oCouresTabs[0].addEventListener('click', function() {
            oCouresTabs[0].className = '';
            oCouresTabs[1].className = '';
            this.className = 'cur';

            getData(pageNo, psize, 10);
        }, false);

        oCouresTabs[1].addEventListener('click', function() {
            oCouresTabs[0].className = '';
            oCouresTabs[1].className = '';
            this.className = 'cur';

            getData(pageNo, psize, 20);
        }, false);

    },
    // 热门课程
    hotList: function() {
        var oList = cm.tool.gel('.j-hotRankingList')[0];
        var arrData = [];
        var timer = null;
        var arr1 = [];

        for(var i=0;i<20;i++){
            arr1.push(i);
        }

        arr1.sort(randomsort);
        function randomsort(a, b) {  
            return Math.random()>.5 ? -1 : 1;
        }  


        cm.tool.ajax({
            method: 'GET',
            url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
            success: function(response) {
                arrData = JSON.parse(response);

                // [{
                //    "id":"967019",//课程ID
                //  "name":"和秋叶一起学职场技能",//课程名称
                //  "bigPhotoUrl":"http://img1.ph.126.net/eg62.png",//课程大图
                //  "middlePhotoUrl ":"http://img1.ph.126.net/eg62.png",//课程中图
                //  "smallPhotoUrl":" http://img1.ph.126.net/eg62.png ",//课程小图
                //  "provider ":"秋叶",//机构发布者
                //  "learnerCount ":"23",//在学人数
                //  "price ":"128",//课程价格，0为免费
                //  "categoryName ":"办公技能",//课程分类
                //  "description ":"适用人群：最适合即将实习、求职、就职的大学生，入职一、二三年的新人。别以为那些职场老人都知道！"//课程描述
                // }]

                var listHTML = '';
                for (var i = 0; i < arrData.length; i++) {
                    listHTML += '<li>\
                                <img width="50" height="50" src="' + arrData[arr1[i]].smallPhotoUrl + '" alt="">\
                                <h3><a href="#">' + arrData[arr1[i]].name + '</a></h3>\
                                <span><i class="u-icon u-icon-people"></i> ' + arrData[arr1[i]].learnerCount + '</span>\
                            </li>';
                }
                oList.innerHTML = '';
                oList.innerHTML = listHTML;
            }
        });

        oList.addEventListener('mouseover', function() {
            clearInterval(timer);
        }, false);

        oList.addEventListener('mouseout', function() {
            timer = setInterval(function() {

                var top = parseInt(cm.tool.getStyle(oList, 'top'));
                if (top == 0) {
                    oList.style.top = '-700px';
                } else {
                    top = top + 70;
                    oList.style.top = top + 'px';
                }

            }, 5000);
        }, false);

        timer = setInterval(function() {
            var top = parseInt(cm.tool.getStyle(oList, 'top'));
            if (top == 0) {
                oList.style.top = '-700px';
            } else {
                top = top + 70;
                oList.style.top = top + 'px';
            }
        }, 5000);
    }
};