var BeforeUnload;

BeforeUnload = (function() {
  function BeforeUnload() {}

  BeforeUnload.enable = function(enableIf, msg) {
    if (!msg) {
      msg = enableIf;
      enableIf = (function() {
        return true;
      });
    }
    $(window).bind('beforeunload', function() {
      if (enableIf()) {
        return msg;
      } else {
        return void 0;
      }
    });
    return $(document).on('page:before-change.beforeunload', (function(_this) {
      return function() {
        if (!enableIf()) {
          return;
        }
        if (confirm(msg)) {
          return _this.disable();
        } else {
          return false;
        }
      };
    })(this));
  };

  BeforeUnload.disable = function() {
    $(window).unbind('beforeunload');
    return $(document).off('page:before-change.beforeunload');
  };

  return BeforeUnload;

})();

window.BeforeUnload = BeforeUnload;
