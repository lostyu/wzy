window.onload = function () {
    cm.app.slide();
    cm.app.productDetail();
};

var cm = {};
cm.tool = {
    gid: function (id) {
        return document.getElementById(id);
    },
    gel: function (selector, parent) {
        return (parent || document).querySelectorAll(selector);
    }
};


cm.ui = {
    /**
     * 幻灯片
     * @param obj 幻灯片容器
     */
    slide: function (obj) {
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
            aSpan[i].addEventListener('click', function () {
                curIndex = this.index;
                tab();
            }, false);
        }

        obj.addEventListener('mouseover', function () {
            clearInterval(timer);
        }, false);
        obj.addEventListener('mouseout', function () {
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
            timer = setInterval(function () {
                curIndex++;
                if (curIndex > len - 1) {
                    curIndex = 0;
                }
                tab();
            }, 5000);
        }

        auto();

    }
};

cm.app = {
    // 幻灯片
    slide: function () {
        cm.ui.slide(cm.tool.gid('j-slide'));
    },
    // 产品移入显示详情
    productDetail: function () {
        var aItem = cm.tool.gel('.j-productList .item');
        var timer = null;

        for (var i = 0; i < aItem.length; i++) {

            aItem[i].addEventListener('mouseover', function () {
                var _this = this;
                clearTimeout(timer);

                timer = setTimeout(function () {
                    _this.style.position = 'relative';
                    var detail = cm.tool.gel('.detail', _this)[0];

                    detail.style.display = 'block';
                }, 300);

            }, false);

            aItem[i].addEventListener('mouseout', function () {
                var _this = this;
                _this.style.position = 'inherit';
                var detail = cm.tool.gel('.detail', _this)[0];

                detail.style.display = 'none';
            }, false);
        }
    }
};






