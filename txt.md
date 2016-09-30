- js的分层(功能)：jquery(tools) 组件(ui) 应用(app) mvc...
- js的规划(管理)：避免全局变量和方法（命名空间，闭包，面向对象）,模块化(seaJs, requireJs)
```
window.onload = function(){
    mv.app.toTip();
};

var mv = {};    // 命名空间


mv.tools = {};


mv.ui = {};
mv.ui.textChange = function(obj, str){
    obj.onfocus = function(){
        if(this.value == str){
            this.value = '';
        }
    };
    
    obj.onbulr = function(){
        if(this.value == ''){
            this.value = str;
        }
    };
};


mv.app = {};
mv.app.toTip = function(){
    var oText1 = document.getElementById('text1');
    mv.ui.textChange(oText1, 'search...');
};
```