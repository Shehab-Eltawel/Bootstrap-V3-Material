
/* Material styling for Forms */

// Text based inputs
var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
// Function to update labels of text fields
$(function() {
    $(input_selector).each(function(elem) {
        if ($(this).val().length > 0 || $(this).attr('placeholder') !== undefined && !$(this).prop('disabled') && $(this).val() === 0) {
            $(this).parent().addClass('active');
            $(this).siblings().addClass('active');
        } else if ( $(this).attr('placeholder') !== undefined && $(this).val().length === 0 ) {
            $(this).siblings('label').css('transform', 'translateY(-20px)');
        } else if ( $(this).attr('placeholder') !== undefined && $(this).prop('disabled') ){
          $(this).siblings().addClass('active disabled');
        } else {
          $(this).parent().removeClass('active');
          $(this).siblings().removeClass('active');
        }
        // Set the width of active border to input width
        var inputWidth = $(this).width();
    });
});

// Handle HTML5 autofocus
$('input[autofocus]').siblings().addClass('active');

// Add active if form auto complete
$(document).on('change', input_selector, function() {
    if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined ) {
        $(this).parent().addClass('active').removeClass('not');
        $(this).siblings().addClass('active');
    }

});

var checkbox = $('input[type="checkbox"]');
  checkbox.on('change', function(){
      if ($(this).is(':checked')) {
        $(this).parent().addClass('filled');
      } else {
          $(this).parent().removeClass('filled');
      }
});

// Detecting Radio changes
$('input[type="radio"]').on('change', function(){
  if ($(this).is(':checked')) {
    $(this).parent().addClass('filled');
  }
});

$('input[type="radio"]').bind('click', function(){
    $('input[name="' + $(this).attr('name') + '"]').not($(this)).trigger('deselect');
});

$('input[type="radio"]').bind('deselect', function(){
    $(this).parent().removeClass('filled');
});



// Add active when element has focus
$(document).on('focus', input_selector, function() {
    $(this).parent().addClass('active').removeClass('not');
    $(this).siblings().addClass('active');
});

$(document).on('blur', input_selector, function() {
    if ($(this).val().length === 0 ) {
        $(this).parent().removeClass('active').addClass('not');
        $(this).siblings().removeClass('active');
        $(this).siblings('i').removeClass('active');
    }
});


// File Input Path
var inputFile = $('input[type="file"]');
var textInput = $('.file-input > .form-control');
inputFile.on('change', function(){
  var fileName = $(this)[0].files[0].name;
  var fileTextParent = $(this).closest('.form-group');
  fileTextParent.find(textInput).val(fileName);
  textInput.parent().addClass('active');
});

// Bootstrap select
$('select').selectpicker({
    iconBase: 'icon',
    tickIcon: 'check_box'
});

// Add active stats to bootstrap-select only on values change
$('.bootstrap-select').on('change.bs.select', function (e) {
  $(this).find('.btn').addClass('active');
});

/* Datepicker*/
$('.date').bootstrapMaterialDatePicker({
    weekStart: 0,
    time: false
});

/* Tooltip */
$('[data-toggle="tooltip"]').tooltip({
    container: 'body'
});


/*  NavTabs */
var navTab = $('.nav-tabs > li');

var navTabsNum = navTab.length;

var navTabWidth = (100 / navTabsNum)+'%';

navTab.width(navTabWidth);

var indicator = $('<span class="indicator"></span>');

indicator.width(navTabWidth);

var navTabs = $('.nav-tabs');

indicator.appendTo(navTabs);

$('.nav-tabs a').on('shown.bs.tab', function (e) {
  var activeTab = $(e.target).parents('.nav-tabs > .active');
  var activeInd = activeTab.index();
  indicator.css('transform', 'translateX('+ activeInd*100 +'%)');
});


/* Collapse  */
$('.collapse.in').prev('.panel-heading').addClass('active');
$('.panel-group').on('show.bs.collapse', function(a) {
  $(a.target).prev('.panel-heading').addClass('active');
  }).on('hide.bs.collapse', function(a) {
  $(a.target).prev('.panel-heading').removeClass('active');
});

// Prevent normal buttons to keep focus after leaving
  var btn = $('.btn');
  btn.on('mouseup mouseleave',function(){
    var btnParent = $(this).parent();
    if ( btnParent.is('.btn-group, .btn-group-vertical') !== true ) {
        this.blur();
    } else {null}
  });




// prevent buttons to behave like buttons
$(document).ready(function (){
  $('.btn').click(function(e){
    e.preventDefault();
  });
});

/*========== Show source ============ */
$(document).ready(function(){

(function(){
  var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function(){
    var html = $(this).parent().html();
    html = cleanSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
  });

  $('.bs-component [data-toggle="popover"]').popover();
  $('.bs-component [data-toggle="tooltip"]').tooltip();

  $(".bs-component").hover(function(){
    $(this).append($button);
    $button.show();
  }, function(){
    $button.hide();
  });

  function cleanSource(html) {
    html = html.replace(/×/g, "&times;")
               .replace(/«/g, "&laquo;")
               .replace(/»/g, "&raquo;")
               .replace(/←/g, "&larr;")
               .replace(/→/g, "&rarr;");

    var lines = html.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
        re = new RegExp(" {" + indentSize + "}");

    lines = lines.map(function(line){
      if (line.match(re)) {
        line = line.substring(indentSize);
      }

      return line;
    });

    lines = lines.join("\n");

    return lines;
  }

})();
})
