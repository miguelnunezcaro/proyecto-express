var express = require('express');
var LdapAuth = require('ldapauth-fork');
const {
  use
} = require('.');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Express'
  });
});


router.post('/auth', (req, res) => {

  var basicAuth = require('basic-auth');
  var LdapAuth = require('ldapauth-fork');

  var ldap = new LdapAuth({
    url: 'ldap://localhost:389',
    bindDN: 'cn=admin,dc=iesalixar,dc=org',
    bindCredentials: 'passiesalixar',
    searchBase: 'ou=alumnos,dc=iesalixar,dc=org',
    searchFilter: '(uid={{username}})',
    reconnect: true,
  });

  ldap.authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) {
      res.render('login', {
        title: 'Express'
      });
    } else {
      res.send(`username:${user.uid}, dn:${user.dn}`)
    }
  });
});

module.exports = router;