define(function(require, exports, module){
  
  var $, Mustache, tpl_panel, tpl_status;

  $ = require("jquery");
  Mustache = require("mustache");

  // 加载模板
  tpl_panel = require("../tpl/panel.tpl");
  tpl_status = require("../tpl/status.tpl");

  // console.log('求着陆') ^^
  var txt = require("../tpl/txt.tpl");
  console.log(txt);


  function Panel(el){

    // invite-panel容器
    this.el = el;

    // 缓存被邀请的id
    this.invited = [];

    // 缓存解析后的数据
    this.data = null;

    // 缓存status数据
    this.status = [];

    // 缓存以uid为key的数据对象
    this.user = {};

    Panel.prototype.init = function(){
      this.render();
    }

    // 整理服务器返回的原始数据
    Panel.prototype.parse = function(data){

      // 处理已邀请数据
      for(var i=0; i<data.invited.length; i++){
        this.invited.push(data.invited[i].id);
        this.status.push(data.invited[i]);
        this.user[data.invited[i].id] = data.invited[i];
      }

      // 处理推荐人选
      for(var i=0; i<data.recommended.length; i++){
        // 标注奇偶列
        if((i+1) % 2 == 0){
          data.recommended[i].even = true;
        }

        // 标注是否已被邀请
        if($.inArray(data.recommended[i].id, this.invited) != -1){
          data.recommended[i].invited = true;
        }else{
          data.recommended[i].invited = false;
        }

        this.user[data.recommended[i].id] = data.recommended[i];
      }
      this.data = data;
      return data;
    }

    Panel.prototype.getData = function(callback){
      var self = this;
      $.get("/invite_panel.json", function(o){
        if(typeof o == "string"){
          o = JSON.parse(o);
        }
        callback(self.parse(o));
      })
    }

    Panel.prototype.render = function(){
      var self = this;
      this.getData(function(o){
        $(self.el).html(
          Mustache.to_html(tpl_panel, o)
        );
        self.renderStatus();
        self.trigger();
      });
    }

    Panel.prototype.renderStatus = function(uid, action){
      var data = {};
      if(uid){
        data.show = true;
        // 把当前uid从已邀请队列中删除掉或添加到队列
        switch(action){
          case "add":
            this.status.unshift(this.user[uid]);
            break;
          case "cancel":
            for(var i=0; i<this.status.length; i++){
              if(uid == this.status[i].id){
                this.status.splice(i, 1);
                break;
              }
            }
            break;
        }
      }else{
        if(this.status.length > 0){
          data.show = true;
        }else{
          data.show = false;
        }
      }

      if(this.status.length == 1){
        data.user_one = this.status[0];
      }else if(this.status.length > 1){
        data.user_one = this.status[0];
        data.user_two = this.status[1];
      }

      data.total = this.status.length;

      $(".invite-status").html(
        Mustache.to_html(tpl_status, data)
      );
    }

    Panel.prototype.addInvite = function(uid){
      // TODO
    }

    Panel.prototype.cancelInvite = function(uid){
      // TODO
    }

    Panel.prototype.trigger = function(){
      var self = this;
      $(".invite-panel-wrap button").bind("click", function(e){
        var $this = $(this);
        var uid = parseInt($this.data("id"));
        if($this.hasClass("invite-btn")){
          // 邀请
          self.renderStatus(uid, 'add');
          self.addInvite(uid);
          $this.removeClass("btn-primary invite-btn")
            .addClass("btn-inverse uninvite-btn").text("收回邀请");
        }else{
          // 收回邀请
          self.renderStatus(uid, 'cancel');
          self.cancelInvite(uid);
          $this.removeClass("btn-inverse uninvite-btn")
            .addClass("btn-primary invite-btn").text("邀请回答");
        }
      });
    }
  }

  module.exports = Panel;

});
