Router.route('/', function () {
  this.render('home', {
    data: function () {

    }
  });
});

Router.route('/admin', function () {
  this.render('admin', {
    data: function () {

    }
  });
});

Router.route('/certificate/:certificateAddress', function () {
  this.render('certificate', {
    data: function () {

    }
  });
});

Router.route('/issuer', function () {
  this.render('issuer', {
    data: function () {

    }
  });
});

//Router.route('/login', function () {
//  this.render('login', {
//    data: function () {
//
//    }
//  });
//});
//
//Router.onBeforeAction(function () {
//  if (!Meteor.userId() && !Meteor.loggingIn()) {
//    this.redirect('login');
//    this.stop();
//  } else {
//    this.next();
//  }
//}, {
//  except: ['login']
//});
