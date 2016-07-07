'use strict';

// Deps
const Table = require('cli-table');
const colors = require('colors');
const psTree = require('ps-tree');
const which = require('which');
const rx = require('rx');


let utils = module.exports = {};




utils.extendEvents = function(obj, key) {

  if (obj[key]) {
    throw new Error(`Key ${key} already exists.`);
  }

  obj[key] = new rx.Subject();

  obj.on = function(name, handler) {
    let sub = this[key].filter((e) => {
        return e.name === name;
      })
      .subscribe((e) => {
        handler(e.data);
      });

    return function() {
      sub.dispose();
    };
  };

  obj.emit = function(name, data) {
    this[key].onNext({
      name: name,
      data: data
    });
  };

};


utils.parseCmdStringToArray = function(cmd, withWhich) {
  cmd = cmd.split(' ');
  if (withWhich !== false) {
    cmd[0] = which.sync(cmd[0]);
  }
  return cmd;
};


utils.createTableString = function(headers, rows) {

  let table = new Table({
    head: headers.map((item) => {
      return (item).cyan
    })
  });

  table.push.apply(table, rows);
  return table.toString();

};


utils.createTableView = function(title, headers, rows, footer) {
  return utils.createDefaultView(title, utils.createTableString(headers, rows), footer);
};


utils.createDefaultView = function(title, content, footer) {

  let res = '\n';

  if (title) {
    res += colors.bold(title) + '\n';
  }

  if (content) {
    res += content + '\n\n';
  }

  if (footer) {
    res += footer;
  }

  return res;
};



utils.killPID = function(pid, signal, callback) {
  signal = signal || 'SIGKILL';
  callback = callback || function() {};
  var killTree = true;
  if (killTree) {
    psTree(pid, function(err, children) {
      [pid].concat(
        children.map(function(p) {
          return p.PID;
        })
      ).forEach(function(tpid) {
        try {
          process.kill(tpid, signal)
        } catch (ex) {}
      });
      callback();
    });
  } else {
    try {
      process.kill(pid, signal)
    } catch (ex) {}
    callback();
  }
};
