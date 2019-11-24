"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require("../schemas/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "index",
    value: function index(req, res) {
      var id = req.params.id;

      _user2.default.findById(id, function (err, user) {
        if (err) res.status(404).send("notFound");

        res.json(user);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var data = req.body;
      var user = new PostModel(data);

      user.save().then(function (user) {
        return console.log("user " + user.fullname + " created");
      }).catch(function (err) {
        return res.status(400).json(err);
      });

      return res.send("Запись добавленна");
    }
  }, {
    key: "read",
    value: function read(req, res) {
      console.log(req.params);
      _user2.default.findOne({ _id: req.params.id }).then(function (user) {
        return res.json(user);
      }).catch(function (err) {
        return res.json({ mes: err });
      });
    }
  }, {
    key: "update",
    value: function update(req, res) {
      _user2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {

        if (err) {
          res.send(err);
        }

        res.json({ status: "Запись изменнена" });
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      console.log(req.params);

      _user2.default.remove({
        _id: req.params.id
      }).then(function (post) {
        if (post) {
          res.json({ status: "Запись удалена" });
        } else {
          res.json({ status: "error" });
        }
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;