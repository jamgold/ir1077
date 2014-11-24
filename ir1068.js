if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.registerHelper('currentPath', function(){
    var c = Router.current();
    return c ? c.route.path() : '';
  });

  Template.registerHelper('menuItems', function(place) {
        var items = [];
        place = place == undefined ? null : place;

        Router.routes.filter(function(r){
          // console.log(r.where);
            var x = r.where == 'client';
            if(x)
            {
                x = r.options['menuItem'] != undefined;
                if(x && place) x = r.options[place] != undefined;
            }
            return 1;
        }).sort(function(a,b){
            var aw = 0.0,bw = 0.0;
            if(a.options['menuItem']['weight']) aw = parseFloat(a.options['menuItem']['weight']);
            if(b.options['menuItem']['weight']) bw = parseFloat(b.options['menuItem']['weight']);
            if(aw == bw) return 0;
            else if(aw < bw) return -1;
            else return 1;
        }).forEach(function(r){
          var p = r.path();
            items.push({
              title: r.options.menuItem.title,
              path: p,
              active: p == place ? 'active' : ''
            });
        });
        return items;
  });

  Template.home.helpers({
    counter: function () {
      return Session.get("counter");
    },
  });

  Template.home.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Router.configure({
    layoutTemplate: 'layoutTemplate',
    onRun: function () {
      console.log('onRun '+this.route.getName());
      this.next();
    },
    onRerun: function () {
      console.log('onReRun '+this.route.getName());
      this.next();
    },
    onBeforeAction: function () {
      console.log('onBeforeAction '+this.route.getName());
      this.next();
    },
    onAfterAction: function () {
      console.log('onAfterAction '+this.route.getName());
    },
    onStop: function () {
      console.log('onStop '+this.route.getName());
    },
  });

  Router.route('/', function(){
    this.render('home');
  },{
    name: 'Home',
    menuItem: {
        title: 'Home',
        weight: 2.0
    },
  });

  Router.route('/one', function(){
    this.render('one')
  }, {
    name: 'One',
    menuItem: {
      title: 'First Page',
      weight: 3.0
    },
  });

  Router.route('/two', function(){
    this.render('two');
  },{
    name: 'Two',
    menuItem: {
      title: 'Second Page',
      weight: 3.1
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
