$(document).ready(function () {
    initSlideShow();
    initCount();
    initPopups();
    initMenu();
    initFilter();
    initFilterMobile();
    initHistory();
    initOrder();
    initCampaignSubscribe();
    initPopupGallery();
    if ('nanoScroller' in $.fn) {
        $('.filter .holder .nano').nanoScroller({alwaysVisible: true, iOSNativeScrolling: true});
    }
    if ('SumoSelect' in $.fn) {
        $('select').SumoSelect();
    }
    if ('iCheck' in $.fn) {
        $('input').iCheck({
            checkboxClass: 'check',
            radioClass: 'radio',
            increaseArea: '20%' // optional
        });
    }
    if (!device.mobile() && !device.tablet()) {
        $(window).resize(function () {
            setTimeout(function () {
                initFilterMobile();
                initMatrix();
                initSly();
                initCompare();
            }, 100);
        });
        var _h = $(window).height() - 698;
        $('#main').css({
            'min-height': _h
        });
    } else {
        $(window).on("orientationchange", function (event) {
            setTimeout(function () {
                initFilterMobile();
                initMatrix();
                initSly();
                initCompare();
            }, 100);
        });
    }
    $(window).load(function () {
        initSly();
        initMatrix();
        initSameHeight();
        initCompare();
        if ('dotdotdot' in $.fn) {
            $(".product .description p").dotdotdot({
                wrap: 'letter'
            });
        }
    });
    $('.tabset:not(.nottabset)').tabset();
    initProductTabs();
    initBasket();
    if (screen.width <= 635) {
        $('.tab-controls a').click(function (event) {
            setTimeout(function () {
                var _left = $('.tab-controls .active').index();
                $('.tab-controls').animate({
                    scrollLeft: _left * 160
                }, 200);
            }, 100);
            event.preventDefault();
        });
    }
    $('.accordion .item .heading').click(function () {
        if (!$(this).parent().hasClass('active')) {
            $(this).parents('.accordion').children('.item.active').find('.expanded').slideUp(500, function () {
                $(this).parent().removeClass('active');
            });
            $(this).parent().find('.expanded').slideDown(500, function () {
                $(this).parent().addClass('active')
            });
        } else {
            $(this).parents('.accordion').children('.item.active').find('.expanded').slideUp(500, function () {
                $(this).parent().removeClass('active');
            });
        }
    });
    $('.subscribe').submit(function () {
        return false;
    })
    $("#subs_pre_email").keyup(function (e) {
        if (e.keyCode == 13) {
            $('.subscribe-link').click();
            return false;
        }
    });
    $('body').on('mousemove', ".star.hover span", function (e) {
        var parentOffset = $(this).offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        if (relX < 20) {
            $(this).parent().removeClass('star1 star2 star3 star4 star5').addClass('star1');
        } else if (relX < 45) {
            $(this).parent().removeClass('star1 star2 star3 star4 star5').addClass('star2');
        } else if (relX < 69) {
            $(this).parent().removeClass('star1 star2 star3 star4 star5').addClass('star3');
        } else if (relX < 92) {
            $(this).parent().removeClass('star1 star2 star3 star4 star5').addClass('star4');
        } else {
            $(this).parent().removeClass('star1 star2 star3 star4 star5').addClass('star5');
        }
        //console.log(relX + ' ' + relY);
    })
    $('body').on('mouseleave', ".star.hover span", function () {
        $(this).parent().removeClass('star1 star2 star3 star4 star5').addClass('star' + $(this).attr('data-star'));
    });
    $('body').on('click', ".star.hover span", function () {
        var $parent = $(this).parent();
        var $raty = 1;
        var $this = $(this);
        $parent.removeClass('hover');
        if ($parent.hasClass('star1')) {
            $raty = 1;
        } else if ($parent.hasClass('star2')) {
            $raty = 2;
        } else if ($parent.hasClass('star3')) {
            $raty = 3;
        } else if ($parent.hasClass('star4')) {
            $raty = 4;
        } else if ($parent.hasClass('star5')) {
            $raty = 5;
        }
        $.ajax({url: $domain + 'StarRaty',
            method: 'post',
            dataType: 'json',
            data: {id: $this.attr('data-id'), type: 'product', ajax: true, raty: $raty, return: 'json'},
            success: function (result) {
                //console.log(result);
                if (result.result == true) {
                } else {
                    if (result.raty) {
                        $parent.removeClass('star1 star2 star3 star4 star5');
                        if (result.raty != '0') {
                            $parent.addClass('star' + result.raty);
                            $parent.find('kbd').html(result.raters);
                        }
                    } else
                        alert('Error');
                }
            }});
    });

});
function initPopupGallery() {
    $('.product .photo .video-thumbs').each(function (index, el) {
        var _src = $('img', this).attr('src');
        $('img', this).hide();
        $(this).css('background-image', 'url(' + _src + ')');
    });
    $('.photo-popup .photo .gallery li a').click(function (event) {
        var _index = $(this).parent().index();
        if ($(this).hasClass('video-thumbs')) {
            var _src = $(this).attr('href');
            $('.photo-popup .fade li').eq(_index).find('iframe').attr('src', _src);
        } else {
            $('.photo-popup .fade li iframe').attr('src', '');
        }
    });
    $('.product .fade li').click(function (event) {
        var _index = $(this).index();
        if ($('.photo-popup .gallery li').eq(_index).find('a').hasClass('video-thumbs')) {
            var _src = $('.photo-popup .gallery li').eq(_index).find('a').attr('href');
            $('.photo-popup .fade li').eq(_index).find('iframe').attr('src', _src);
        }
        $('.photo-popup .gallery li').eq(_index).trigger('click');
        if (_index >= 4) {
            $('.photo-popup .gallery .next').trigger('click');
        }
        $('.photo-popup').css({
            left: 0,
            opacity: 0
        }).fadeTo(200, 1);
    });
    $('.photo-popup .bg, .photo-popup .fade li').click(function (event) {
        $('.photo-popup').fadeTo(200, 0, function () {
            $('.photo-popup').css({
                left: '-100%'
            });
            $('.photo-popup .fade li iframe').attr('src', '');
        });
    });
    // Update
    $('.product .photo .video-thumbs').click(function (event) {
        setTimeout(function () {
            $('.product .fade li.active').trigger('click');
        }, 1000);
    });
    // End Update
}

function initCampaignSubscribe() {
    $('.follow-link-ajax').click(function (event) {
        event.preventDefault();
        var $this = $(this);

        $.fancybox($domain + 'product/subscribe/product&ajax=true', {
            type: 'ajax',
            wrapCSS: 'cart-popup',
            margin: 10,
            padding: 0,
            ajax: {
                data: {action: 'subscribe', ajax: true, product: $($this).attr('data-id')},
                type: "POST"
            },
            beforeClose: function () {
                $('span', $this).remove();
                $('img', $this).attr('src', $domain + 'css/OK.svg');
                $this.unbind('click');
            }
        });
        /*$.ajax({
         type: "POST",
         cache: false,
         url: $domain + 'product/subscribe/product&ajax=true',
         data: {action: 'subscribe', ajax: true, product: $($this).attr('data-id')},
         beforeSend: function (xhr) {
         $('img', $this).attr('src', $domain + 'css/ajax-loader.gif');
         },
         success: function (data) {
         $('span', $this).remove();
         $('img', $this).attr('src', $domain + 'css/OK.svg');
         } // success
         }); // ajax*/
    });
}
function initProductTabs() {
    $('#product_all .tab-controls a').click(function (event) {
        event.preventDefault();
        var $id = $(this).attr('href');
        $id = $id.substring(1);
        $('#product_all .tab-controls li').removeClass('active');
        $(this).closest('li').addClass('active');
        if ($id == 'product_all') {
            $('#product_all .tab .tab_part').slideDown();
        } else {
            $('#product_all .tab .tab_part[id!="' + $id + '"]').slideUp();
            $('#product_all .tab .tab_part[id="' + $id + '"]').slideDown();
        }
    })
}

function initBasket() {
    $(document).on('submit', 'form.buyProduct', function (event) {
        event.preventDefault();
        $.fancybox($domain + 'order?ajax=true', {
            type: 'ajax',
            wrapCSS: 'cart-popup',
            margin: 10,
            padding: 0,
            ajax: {
                data: $(this).serialize(), // all form fields
                type: "POST"
            },
            beforeClose: function () {
                $('.cart span').load($domain + 'order?ajax=true', {action: 'getBasketStatus'});
            }
        });
    });
    $(document).on('click', '.basket .number .plus', function (event) {
        event.preventDefault();
        var $input = $('input', $(this).closest('.number'));
        $input.val(parseInt($input.val()) + 1);
        $(this).closest('form').submit();
    });
    $(document).on('click', '.info .number .plus', function (event) {
        event.preventDefault();
        var $input = $('input', $(this).closest('.number'));
        $input.val(parseInt($input.val()) + 1);
    });
    $(document).on('click', '.info .number .minus', function (event) {
        event.preventDefault();
        var $input = $('input', $(this).closest('.number'));
        var $val = parseInt($input.val());
        if ($val > 1) {
            $input.val($val - 1);
        }
    });
    $(document).on('click', '.basket .number .minus', function (event) {
        event.preventDefault();
        var $input = $('input', $(this).closest('.number'));
        var $val = parseInt($input.val());
        if ($val > 1) {
            $input.val($val - 1);
            $(this).closest('form').submit();
        }
    });
    $(document).on('click', '.basket .delete', function (event) {
        event.preventDefault();
        var $input = $('.number input', $(this).closest('tr'));
        $input.val(0);
        $(this).closest('form').submit();
    });
}
function initSameHeight() {
    $('.wishlist, .compare').sameHeight({
        elements: '.head',
        flexible: true,
        multiLine: true
    });
    $('.product-list.blocks').sameHeight({
        elements: 'h3',
        flexible: true,
        multiLine: true
    });
}

function initOrder() {
    $('#second-address').on('ifChecked', function (event) {
        $('.order .more-address').show();
    });
    $('#second-address').on('ifUnchecked', function (event) {
        $('.order .more-address').hide();
    });
}

function initCompare() {
    var _item = $('.compare th').length;
    if (screen.width <= 635) {
        _item = _item * 170;
    } else {
        _item = _item * 214;
    }
    $('.compare table').width(_item);
    $('.compare-head tr').each(function (index, el) {
        var _index = $(this).index(),
                _thisH = $(this).height(),
                _h = $('.compare tr').eq(_index).height();
        if (_thisH > _h) {
            $('.compare tr').eq(_index).find('>*').outerHeight(_thisH);
        } else if (_thisH < _h) {
            $(this).find('>*').outerHeight(_h);
        }
    });
}

function initHistory() {
    /*$('.history-table a').click(function (event) {
     $('.history-table').hide();
     $('.history-more').show();
     event.preventDefault();
     });
     $('.history-more .back').click(function (event) {
     $('.history-more').hide();
     $('.history-table').show();
     event.preventDefault();*
     });*/
}

function initMatrix() {
    if (screen.width <= 635) {
        $('.matrix').each(function (index, el) {
            $(this).addClass('gallery');
            initSly();
        });
    } else {
        $('.matrix').each(function (index, el) {
            $(this).removeClass('gallery');
            initSly();
        });
    }
}

function initFilterMobile() {
    if (screen.width < 765 && !$('#main > .filter').size()) {
        var _filter = $('.filter').detach();
        $('#main').append(_filter).addClass('filter-mobile');
    } else {
        var _filter = $('.filter').detach();
        $('#sidebar').append(_filter).removeClass('filter-mobile');
    }
}

function initFilter() {
    if ('slider' in $.fn) {
        var $price_min = parseInt($('.slider').attr('data-price_min'));
        var $price_max = parseInt($('.slider').attr('data-price_max'));
        $(".slider").slider({
            range: true,
            min: $price_min,
            max: $price_max,
            values: [$price_min, $price_max],
            slide: function (event, ui) {
                $('.min').val(ui.values[0]);
                $('.max').val(ui.values[1]);
                var _top = $('.slider').offset().top - $('.filter').offset().top - 17;
                $('.found').css({
                    top: _top,
                    left: 216
                }).fadeIn(200);
            },
            change: function (event, ui) {
                //$('#sidebarFilterForm').submit();
            }
        });
        $('.min').val($(".slider").slider("values", 0));
        $('.max').val($(".slider").slider("values", 1));
    }
    $('.filter-link').click(function (event) {
        $('body').addClass('open-filter');
        event.preventDefault();
    });
    $('.filter .close').click(function (event) {
        $('body').removeClass('open-filter');
        $('.found').fadeOut(200);
        event.preventDefault();
    });
    /*$('.filter input:checkbox').on('ifClicked', function (event) {
     var _top = $(this).offset().top - $('.filter').offset().top - 9;
     if (!device.mobile() && !device.tablet()) {
     } else {
     _top = _top - 6
     }
     $('.found').css({
     top: _top,
     left: 148
     }).fadeIn(200);
     });
     $('.filter input:checkbox').on('ifUnchecked', function (event) {
     if ($('.filter input:checkbox:checked').size()) {
     var _top = $('.filter input:checkbox:checked').offset().top - $('.filter').offset().top - 9;
     if (!device.mobile() && !device.tablet()) {
     } else {
     _top = _top - 6
     }
     $('.found').css({
     top: _top,
     left: 148
     }).fadeIn(200);
     } else {
     $('.found').fadeOut(200);
     }
     })*/
    $('.found .hide').click(function (event) {
        $('.found').fadeOut(200);
        event.preventDefault();
    });
    if ($('.filter').size()) {
        $(window).load(function () {
            $(window).trigger('resize');
        });
    }
}

function initMenu() {
    $('.mobile-menu').click(function (event) {
        $('body').addClass('open-nav');
        event.preventDefault();
    });
    $('.navigation .close').click(function (event) {
        $('body').removeClass('open-nav');
        event.preventDefault();
    });
    $('#nav .open').click(function (event) {
        var _this = $(this);
        if (!_this.hasClass('active')) {
            _this.closest('#nav').find('.nav-holder > ul').slideDown(500, function () {
                _this.addClass('active');
            })
        } else {
            _this.closest('#nav').find('.nav-holder > ul').slideUp(500, function () {
                _this.removeClass('active');
            })
        }
        event.preventDefault();
    });
    if ($('#wrapper').width() < 635) {
        $('#nav b').click(function (event) {
            $(this).closest('li').toggleClass('active');
        });
    }
}

function initPopups() {
    if ('fancybox' in $.fn) {
        $('.notification').fancybox({
            type: 'ajax',
            wrapCSS: 'notification-popup',
            margin: 10,
            padding: 0
        });
        $('.error-link').fancybox({
            type: 'ajax',
            wrapCSS: 'error-popup',
            margin: 10,
            padding: 0
        });
        $('.subscribe-link').fancybox({
            type: 'ajax',
            wrapCSS: 'subscribe-popup',
            margin: 10,
            padding: 0,
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            }
        });
        $('.report-link').fancybox({
            type: 'ajax',
            wrapCSS: 'report-popup',
            margin: 10,
            padding: 0,
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            },
            beforeShow: function (current, previous) {
                $('.popup select').SumoSelect();
            }
        });
        $('.verification-link').fancybox({
            type: 'ajax',
            wrapCSS: 'verification-popup',
            margin: 10,
            padding: 0
        });
        $('.cart').fancybox({
            type: 'ajax',
            wrapCSS: 'cart-popup',
            margin: 10,
            padding: 0,
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            }
        });
        $('.registration-link').fancybox({
            type: 'ajax',
            wrapCSS: 'registration-popup',
            margin: 10,
            padding: 0,
            beforeShow: function (current, previous) {
                $('.popup select').SumoSelect();
            },
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            }
        });
        $('.forgot').fancybox({
            type: 'ajax',
            wrapCSS: 'reset-popup',
            margin: 10,
            padding: 0,
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            }
        });
        $('.callback-link').fancybox({
            type: 'ajax',
            wrapCSS: 'callback-popup',
            margin: 10,
            padding: 0,
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            },
            beforeShow: function (current, previous) {
                $('.popup select').SumoSelect();
            }
        });
        $('.login-link').fancybox({
            type: 'ajax',
            wrapCSS: 'login-popup',
            margin: 10,
            padding: 0,
            beforeShow: function (current, previous) {
                $('input[type=checkbox]').iCheck({
                    checkboxClass: 'check',
                    increaseArea: '20%' // optional
                });
            },
            beforeLoad: function () {
                var url = $(this.element[0]).attr("href") + '?ajax=true';
                this.href = url;
            }
        });
    }
    $(document).on('click', '.back', function (event) {
        event.preventDefault();
        $.fancybox.close();
    });
}

(function ($) {
    $.fn.sameHeight = function (opt) {
        var options = $.extend({
            skipClass: 'same-height-ignore',
            leftEdgeClass: 'same-height-left',
            rightEdgeClass: 'same-height-right',
            elements: '>*',
            flexible: false,
            multiLine: false,
            useMinHeight: false
        }, opt);
        return this.each(function () {
            var holder = $(this),
                    postResizeTimer;
            var elements = holder.find(options.elements).not('.' + options.skipClass);
            if (!elements.length)
                return;

            // resize handler
            function doResize() {
                elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
                if (options.multiLine) {
                    // resize elements row by row
                    resizeElementsByRows(elements, options);
                } else {
                    // resize elements by holder
                    resizeElements(elements, holder, options);
                }
            }
            doResize();

            // handle flexible layout / font resize
            if (options.flexible) {
                $(window).bind('resize orientationchange fontresize', function (e) {
                    doResize();
                    clearTimeout(postResizeTimer);
                    postResizeTimer = setTimeout(doResize, 100);
                });
            }
            // handle complete page load including images and fonts
            $(window).bind('load', function () {
                doResize();
                clearTimeout(postResizeTimer);
                postResizeTimer = setTimeout(doResize, 100);
            });
        });
    }

    // detect css min-height support
    var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

    // get elements by rows
    function resizeElementsByRows(boxes, options) {
        var currentRow = $(),
                maxHeight, firstOffset = boxes.eq(0).offset().top;
        boxes.each(function (ind) {
            var curItem = $(this);
            if (curItem.offset().top === firstOffset) {
                currentRow = currentRow.add(this);
            } else {
                maxHeight = getMaxHeight(currentRow);
                resizeElements(currentRow, maxHeight, options);
                currentRow = curItem;
                firstOffset = curItem.offset().top;
            }
        });
        if (currentRow.length) {
            maxHeight = getMaxHeight(currentRow);
            resizeElements(currentRow, maxHeight, options);
        }
    }

    // calculate max element height
    function getMaxHeight(boxes) {
        var maxHeight = 0;
        boxes.each(function () {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        return maxHeight;
    }

    // resize helper function
    function resizeElements(boxes, parent, options) {
        var parentHeight = typeof parent === 'number' ? parent : parent.height();
        boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function (i) {
            var element = $(this);
            var depthDiffHeight = 0;

            if (typeof parent !== 'number') {
                element.parents().each(function () {
                    var tmpParent = $(this);
                    if (this === parent[0]) {
                        return false;
                    } else {
                        depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
                    }
                });
            }
            var calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
            if (calcHeight > 0) {
                element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
            }
        });
        boxes.filter(':first').addClass(options.leftEdgeClass);
        boxes.filter(':last').addClass(options.rightEdgeClass);
    }
}(jQuery));

$.fn.tabset = function (o) {
    var o = $.extend({
        "tab": ">.tab",
        "tab_control": ">ul",
        "tab_control_parent": ">div",
        "tab_control_item": ">li",
        "a_class": "active",
        "t_a_class": "active",
        "style": {
            "forActive": {
                "display": "block"
            },
            "forInActive": {
                "display": "none"
            }
        }
    }, o);
    return this.each(function () {
        var tabset = $(this),
                tab = $(o.tab, tabset),
                ctrl_pnt = $(o.tab_control_parent, tabset),
                ctrl = $(o.tab_control, tabset).size() ? $(o.tab_control, tabset) : $(o.tab_control, ctrl_pnt),
                ctrl_item = $(o.tab_control_item, ctrl),
                a_class = {
                    "name": o.a_class,
                    "selector": "." + o.a_class
                },
        t_a_class = {
            "name": o.t_a_class,
            "selector": "." + o.t_a_class
        },
        style = o.style;
        ctrl_item.click(function (e) {
            var index = $(this).index(),
                    curTab = tab.filter(t_a_class.selector).size() ? tab.filter(t_a_class.selector) : tab.filter(':visible'),
                    nextTab = tab.eq(index);
            $(this).parent().find(o.tab_control_item + a_class.selector).removeClass(a_class.name);
            $(this).addClass(a_class.name);
            if (style) {
                curTab.css(style.forInActive).removeClass(t_a_class.name);
                nextTab.css(style.forActive).addClass(t_a_class.name);
            } else {
                curTab.removeClass(t_a_class.name);
                nextTab.addClass(t_a_class.name);
            }
            e.preventDefault();
        });
    });
}

function initSly() {
    if ('sly' in $.fn) {
        $frame = $('.gallery .holder');
        $frame.each(function () {
            var _this = $(this);
            var $wrap = $(this).parent();

            $('> ul:eq(0)', _this).each(function () {
                var sum = 0;
                $(this).find(">li").each(function () {
                    sum += ($(this).outerWidth(true));
                }).parent().width(sum);
            });

            var _thisW = $(this).width(),
                    _listW = $('ul:eq(0)', this).width(),
                    _listH = $('ul:eq(0)', this).outerHeight(true);

            if (_listW > _thisW) {
                _this.closest('.gallery').addClass('has-scroll');
            } else {
                _this.closest('.gallery').removeClass('has-scroll');
            }

            $(this).sly({
                horizontal: 1,
                smart: 1,
                itemNav: 'basic',
                activateOn: 'click',
                mouseDragging: 0,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                cycleBy: 0,
                cycleInterval: 0,
                scrollBar: 0,
                activatePageOn: 'click',
                pagesBar: $wrap.find('.switchers'),
                pageBuilder: function (index) {
                    return '<li>' + (index + 1) + '</li>';
                },
                scrollBy: 0,
                speed: 1000,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
                prevPage: $wrap.find('.prev'),
                nextPage: $wrap.find('.next'),
                draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
                activeClass: 'active', // Class for active items and pages.
                disabledClass: 'disabled',
                // Cycling
                // cycleBy: 'items',
                // cycleInterval: 1000,
                // pauseOnHover: 1
            }, {
                move: function (a) {
                    wst = this.pos.cur;
                    $(window).trigger('scroll');
                }
            });
            $frame.sly('reload');
        });
    }
}

function initCount() {
    $('.shares .frame > .count').each(function (index, el) {
        var _year = parseInt($(this).attr('data-year')),
                _month = parseInt($(this).attr('data-month')),
                _day = parseInt($(this).attr('data-day'));
        _hour = parseInt($(this).attr('data-hour'));
        _minute = parseInt($(this).attr('data-minute'));
        var _time = new Date(_year, _month - 1, _day, _hour, _minute);
        $(this).countdown({
            until: _time,
            format: 'DHM',
            padZeroes: true,
            alwaysExpire: true,
            onExpiry: function () {
                $(this).closest('li').find('.action').show();
            }
        });
    });
    // Update
    $('.shares .action > .count').each(function (index, el) {
        var _year = parseInt($(this).attr('data-year')),
                _month = parseInt($(this).attr('data-month')),
                _day = parseInt($(this).attr('data-day'));
        _hour = parseInt($(this).attr('data-hour'));
        _minute = parseInt($(this).attr('data-minute'));
        var _time = new Date(_year, _month - 1, _day, _hour, _minute);
        $(this).countdown({
            until: _time,
            format: 'HMS',
            padZeroes: true,
            alwaysExpire: true,
            onExpiry: function () {
                $(this).closest('li').find('.complet').show();
            }
        });
    });
    setInterval(function () {
        $('.action .buy').each(function (index, el) {
            if ($(this).find('span').is(':hidden')) {
                $(this).find('img').hide();
                $(this).find('span').show();
            } else {
                $(this).find('img').show();
                $(this).find('span').hide();
            }
        });
    }, 3000);
    // End
}

function initSlideShow() {
    $('.promo, .illustration').fadeGallery({
        slideElements: '.slide-list li',
        pagerLinks: '.switchers li',
        pauseOnHover: true,
        autoRotation: true,
        switchTime: 8000,
        duration: 650,
        event: 'click'
    });
    $('.photo').fadeGallery({
        slideElements: '.fade li',
        pagerLinks: '.gallery li',
        pauseOnHover: false,
        autoRotation: false,
        duration: 650,
        event: 'click'
    });
    $('.fade-gallery').fadeGallery({
        slideElements: '.f-gall li',
        pagerLinks: '.f-switch li',
        pauseOnHover: true,
        autoRotation: true,
        switchTime: 4000,
        duration: 650,
        event: 'click'
    });
    $('.promo .slide-list li, .news-list .visual, .f-gall li').each(function (index, el) {
        var _src = $('img', this).attr('src');
        $('img', this).hide();
        $(this).css('background-image', 'url(' + _src + ')');
    });
}

jQuery.fn.fadeGallery = function (_options) {
    var _options = jQuery.extend({
        slideElements: 'div.slideset > div',
        pagerLinks: '.control-panel li',
        btnNext: 'a.btn-next',
        btnPrev: 'a.btn-prev',
        btnPlayPause: 'a.play-pause',
        pausedClass: 'paused',
        playClass: 'playing',
        activeClass: 'active',
        pauseOnHover: true,
        autoRotation: false,
        autoHeight: false,
        switchTime: 3000,
        duration: 650,
        event: 'click'
    }, _options);

    return this.each(function () {
        var _this = jQuery(this);
        var _slides = jQuery(_options.slideElements, _this);
        var _pagerLinks = jQuery(_options.pagerLinks, _this);
        var _btnPrev = jQuery(_options.btnPrev, _this);
        var _btnNext = jQuery(_options.btnNext, _this);
        var _btnPlayPause = jQuery(_options.btnPlayPause, _this);
        var _pauseOnHover = _options.pauseOnHover;
        var _autoRotation = _options.autoRotation;
        var _activeClass = _options.activeClass;
        var _pausedClass = _options.pausedClass;
        var _playClass = _options.playClass;
        var _autoHeight = _options.autoHeight;
        var _duration = _options.duration;
        var _switchTime = _options.switchTime;
        var _controlEvent = _options.event;

        var _hover = false;
        var _prevIndex = 0;
        var _currentIndex = 0;
        var _slideCount = _slides.length;
        var _timer;
        if (!_slideCount)
            return;
        _slides.css('opacity', 0).eq(_currentIndex).css('opacity', 1)
        if (_autoRotation)
            _this.removeClass(_pausedClass).addClass(_playClass);
        else
            _this.removeClass(_playClass).addClass(_pausedClass);

        if (_btnPrev.length) {
            _btnPrev.bind(_controlEvent, function () {
                prevSlide();
                return false;
            });
        }
        if (_btnNext.length) {
            _btnNext.bind(_controlEvent, function () {
                nextSlide();
                return false;
            });
        }
        if (_pagerLinks.length) {
            _pagerLinks.each(function (_ind) {
                jQuery(this).bind(_controlEvent, function () {
                    if (_currentIndex != _ind) {
                        _prevIndex = _currentIndex;
                        _currentIndex = _ind;
                        switchSlide();
                    }
                    return false;
                });
            });
        }

        if (_btnPlayPause.length) {
            _btnPlayPause.bind(_controlEvent, function () {
                if (_this.hasClass(_pausedClass)) {
                    _this.removeClass(_pausedClass).addClass(_playClass);
                    _autoRotation = true;
                    autoSlide();
                } else {
                    if (_timer)
                        clearRequestTimeout(_timer);
                    _this.removeClass(_playClass).addClass(_pausedClass);
                }
                return false;
            });
        }

        function prevSlide() {
            _prevIndex = _currentIndex;
            if (_currentIndex > 0)
                _currentIndex--;
            else
                _currentIndex = _slideCount - 1;
            switchSlide();
        }

        function nextSlide() {
            _prevIndex = _currentIndex;
            if (_currentIndex < _slideCount - 1)
                _currentIndex++;
            else
                _currentIndex = 0;
            switchSlide();
        }

        function refreshStatus() {
            if (_pagerLinks.length)
                _pagerLinks.removeClass(_activeClass).eq(_currentIndex).addClass(_activeClass);
            _slides.eq(_prevIndex).removeClass(_activeClass);
            _slides.eq(_currentIndex).addClass(_activeClass);
        }

        function switchSlide() {
            _slides.stop(true, true);
            _slides.eq(_prevIndex).fadeTo(_duration, 0);
            _slides.eq(_currentIndex).fadeTo(_duration, 1);
            refreshStatus();
            autoSlide();
        }

        function autoSlide() {
            if (!_autoRotation || _hover)
                return;
            if (_timer)
                clearRequestTimeout(_timer);
            _timer = requestTimeout(nextSlide, _switchTime + _duration);
        }
        if (_pauseOnHover) {
            _this.hover(function () {
                _hover = true;
                if (_timer)
                    clearRequestTimeout(_timer);
            }, function () {
                _hover = false;
                autoSlide();
            });
        }
        refreshStatus();
        autoSlide();
    });
}
/*
 * Drop in replace functions for setTimeout() & setInterval() that
 * make use of requestAnimationFrame() for performance where available
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

window.requestTimeout = function (fn, delay) {
    if (!window.requestAnimationFrame &&
            !window.webkitRequestAnimationFrame &&
            !window.mozRequestAnimationFrame &&
            !window.oRequestAnimationFrame &&
            !window.msRequestAnimationFrame)
        return window.setTimeout(fn, delay);

    var start = new Date().getTime(),
            handle = new Object();

    function loop() {
        var current = new Date().getTime(),
                delta = current - start;

        delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
    }
    ;

    handle.value = requestAnimFrame(loop);
    return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function (handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearTimeout(handle);
};
/*! device.js 0.1.58 */
(function () {
    var a, b, c, d, e, f, g, h, i, j;
    a = window.device, window.device = {}, c = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), device.ios = function () {
        return device.iphone() || device.ipod() || device.ipad()
    }, device.iphone = function () {
        return d("iphone")
    }, device.ipod = function () {
        return d("ipod")
    }, device.ipad = function () {
        return d("ipad")
    }, device.android = function () {
        return d("android")
    }, device.androidPhone = function () {
        return device.android() && d("mobile")
    }, device.androidTablet = function () {
        return device.android() && !d("mobile")
    }, device.blackberry = function () {
        return d("blackberry") || d("bb10") || d("rim")
    }, device.blackberryPhone = function () {
        return device.blackberry() && !d("tablet")
    }, device.blackberryTablet = function () {
        return device.blackberry() && d("tablet")
    }, device.windows = function () {
        return d("windows")
    }, device.windowsPhone = function () {
        return device.windows() && d("phone")
    }, device.windowsTablet = function () {
        return device.windows() && d("touch")
    }, device.fxos = function () {
        return d("(mobile; rv:") || d("(tablet; rv:")
    }, device.fxosPhone = function () {
        return device.fxos() && d("mobile")
    }, device.fxosTablet = function () {
        return device.fxos() && d("tablet")
    }, device.mobile = function () {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone()
    }, device.tablet = function () {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
    }, device.portrait = function () {
        return 90 !== Math.abs(window.orientation)
    }, device.landscape = function () {
        return 90 === Math.abs(window.orientation)
    }, device.noConflict = function () {
        return window.device = a, this
    }, d = function (a) {
        return -1 !== j.indexOf(a)
    }, f = function (a) {
        var b;
        return b = new RegExp(a, "i"), c.className.match(b)
    }, b = function (a) {
        return f(a) ? void 0 : c.className += " " + a
    }, h = function (a) {
        return f(a) ? c.className = c.className.replace(a, "") : void 0
    }, device.ios() ? device.ipad() ? b("ios ipad tablet") : device.iphone() ? b("ios iphone mobile") : device.ipod() && b("ios ipod mobile") : device.android() ? device.androidTablet() ? b("android tablet") : b("android mobile") : device.blackberry() ? device.blackberryTablet() ? b("blackberry tablet") : b("blackberry mobile") : device.windows() ? device.windowsTablet() ? b("windows tablet") : device.windowsPhone() ? b("windows mobile") : b("desktop") : device.fxos() ? device.fxosTablet() ? b("fxos tablet") : b("fxos mobile") : b("desktop"), e = function () {
        return device.landscape() ? (h("portrait"), b("landscape")) : (h("landscape"), b("portrait"))
    }, i = "onorientationchange" in window, g = i ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(g, e, !1) : window.attachEvent ? window.attachEvent(g, e) : window[g] = e, e()
}).call(this);

addToCompare = function (e, $prdId, obj) {
    e.preventDefault();
    var $obj = $(obj);
    var $image = $obj.find('img:first');
    $image.attr('src', $domain + 'images/svg/loading.svg')
    $.ajax({
        url: $domain + "product",
        method: "POST",
        data: {action: 'addToCompare', product: $prdId, ajax: 'ajax'},
        dataType: "json"
    }).done(function (msg) {
        //console.log(msg);
        if (msg.count) {
            $obj.find('span:first').text($mui['In Compare list']);
            $('#compare_count').text(msg.count);
            $obj.prop('onclick', null).off('click');
        }
        $image.attr('src', $domain + 'images/svg/Compare.svg')
    });
}

deleteFromCompare = function (e, $prdId, obj) {
    e.preventDefault();
    var $obj = $(obj);
    $.ajax({
        url: $domain + "product",
        method: "POST",
        data: {action: 'deleteFromCompare', product: $prdId, ajax: 'ajax'},
        dataType: "json"
    }).done(function (msg) {
        //console.log(msg);
        if (msg.count) {
            $('#compare_count').text(msg.count);
            $('.foritem' + $obj.attr('data-id')).remove();
        } else {
            location.reload();
        }
    });
}

addToWishList = function (e, $prdId, obj) {
    e.preventDefault();
    var $obj = $(obj);
    var $image = $obj.find('img:first');
    $image.attr('src', $domain + 'images/svg/loading.svg')
    $.ajax({
        url: $domain + "product",
        method: "POST",
        data: {action: 'addToWishList', product: $prdId, ajax: 'ajax'},
        dataType: "json"
    }).done(function (msg) {
        //console.log(msg);
        if (msg.count) {
            $('#wishlist_count').text(msg.count);
            $obj.find('span:first').text($mui['In Wishlist']);
            $obj.prop('onclick', null).off('click');
        }
        $image.attr('src', $domain + 'images/svg/Wishlist.svg')
    });
}
deleteFromWishList = function (e, $prdId, obj) {
    e.preventDefault();
    var $obj = $(obj);
    $.ajax({
        url: $domain + "product",
        method: "POST",
        data: {action: 'deleteFromWishList', product: $prdId, ajax: 'ajax'},
        dataType: "json"
    }).done(function (msg) {
        //console.log(msg);
        if (msg.count) {
            $('#wishlist_count').text(msg.count);
            $('.foritem' + $obj.attr('data-id')).remove();
        } else {
            location.reload();
        }
    });
}


compareShowOnlyDifferences = function (e, obj) {
    e.preventDefault();
    var $obj = $(obj);
    $('.comparedAttributes').map(function () {
        var attr = $(this).attr('data-attribute');
        var $value = null;
        var $isDifferent = false;
        $('.attr_value.' + attr + ' td').map(function () {
            if (!$value) {
                $value = $(this).text();
            }
            if ($value != $(this).text()) {
                $isDifferent = true;
            }
        })
        if (!$isDifferent) {
            $('.' + attr + ' td').slideUp();
        }
    })
    $('.compare-controls li').removeClass('active');
    $obj.closest('li').addClass('active');
}
compareShowAllSpecifications = function (e, obj) {
    e.preventDefault();
    var $obj = $(obj);
    $('.comparedAttributes td, .attr_value td').slideDown();
    $('.compare-controls li').removeClass('active');
    $obj.closest('li').addClass('active');
}
