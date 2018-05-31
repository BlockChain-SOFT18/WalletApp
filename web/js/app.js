// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'md', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,

});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/',
    on:{
      pageInit:function (page) {
          console.log("pageInit "+page.name);
          console.log(page);
          var uid = parseInt($.ajax({url: "/User", async: false}).responseText);
          console.log(uid);

          if (uid <=0) {
              app.loginScreen.open('#my-login-screen', true);
          }

          //TODO 迷之特性研究
          $$("#transfer-next-button").on("click",function () {
              var username = $$('#targetUsername').val();
              console.log(username);

          });

      }
    }
});
var settingsView = app.views.create('#view-settings', {
  url: '/account/',
    on:{
      pageInit:function () {
          console.log("account.pageInit");
          $$('.logout-button').on('click', function () {
              $.ajax({url:"/User?Action=2",async:false});
              location.reload();
          });

      }
    }
});
var transferView = app.views.create('#view-transfer', {
    url: '/transfer/',
});
var transfertoaccountView = app.views.create('#view-transfertoaccount', {
    url: '/transfertoaccount/',
    
});


// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
    $.ajax({
        type: 'POST',
        url: '/User',
        data: {
            Action:"1",
            Username:username,
            Password:password
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if(parseInt(data)!=-1) {
                // Close login screen
                app.loginScreen.close('#my-login-screen');
                location.reload();
            }else {
                $$('#my-login-screen [name="password"]').val('');
                app.dialog.create({
                    title: '登录失败',
                    text: '请检查您的凭据',
                    buttons: [
                        {
                            text: 'OK',
                        }]
                }).open();
            }
        }
    });

});

$$('#my-login-screen .register-button').on('click', function () {
    app.loginScreen.open('#register-screen', true);
});

$$("#register-screen .back").on('click',function () {
    app.loginScreen.close('#register-screen');
});

$$("#register-screen .login-button").on('click',function () {
    var username = $$('#register-screen [name="username"]').val();
    var password = $$('#register-screen [name="password"]').val();
    var agencyID = $$('#register-screen [name="agencyID"]').val();
    var mobile = $$('#register-screen [name="mobile"]').val();
    var email = $$('#register-screen [name="email"]').val();
    var realname = $$('#register-screen [name="realname"]').val();
    var repeatPassword = $$('#register-screen [name="repeatPassword"]').val();
    var ID = $$('#register-screen [name="ID"]').val();
    if(password!=repeatPassword) {
        app.dialog.create({
            title: '注册失败',
            text: '确认密码不匹配',
            buttons: [
                {
                    text: 'OK',
                }]
        }).open();
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/User',
        data: {
            Action:"3",
            Username:username,
            Password:password,
            agencyID:parseInt(agencyID),
            mobile:mobile,
            email:email,
            realname:realname,
            ID:ID
        },
        success: function (data, textStatus, jqXHR) {
            console.log(parseInt(data));
            switch (parseInt(data)) {
                case 0:
                case -1:
                    app.dialog.create({
                        title: '注册失败',
                        text: '不知道发生了什么',
                        buttons: [
                            {
                                text: 'OK',
                            }]
                    }).open();
                    break;
                case -2:
                    app.dialog.create({
                        title: '注册失败',
                        text: '重复的用户名',
                        buttons: [
                            {
                                text: 'OK',
                            }]
                    }).open();
                    break;
                case -3:
                    app.dialog.create({
                        title: '注册失败',
                        text: 'UserAgencyDuplicateException',
                        buttons: [
                            {
                                text: 'OK',
                            }]
                    }).open();
                    break;

                case -4:
                    app.dialog.create({
                        title: '注册失败',
                        text: '该机构不存在',
                        buttons: [
                            {
                                text: 'OK',
                            }]
                    }).open();
                    break;
                default:
                    app.loginScreen.close('#register-screen');
                    app.dialog.create({
                        title: '注册成功',
                        text: '现在登录吧',
                        buttons: [
                            {
                                text: 'OK',
                            }]
                    }).open();
                    var username = $$('#register-screen [name="username"]').val("");
                    var password = $$('#register-screen [name="password"]').val("");
                    var agencyID = $$('#register-screen [name="agencyID"]').val("");
                    var mobile = $$('#register-screen [name="mobile"]').val("");
                    var email = $$('#register-screen [name="email"]').val("");
                    var realname = $$('#register-screen [name="realname"]').val("");
                    var repeatPassword = $$('#register-screen [name="repeatPassword"]').val("");
                    var ID = $$('#register-screen [name="ID"]').val("");
                    break;
            }

        }
    });

});

