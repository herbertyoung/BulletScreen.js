/*

BulletScreen.js
A JavaScript plugin make a bullet screen using html5 canvas.
By Harbor Young
Email: szuyhb241@gmail.com

*/

(function(win, undefined){
    'use strict';
    var doc = win.document,
        defaults = {
            canvasWidth: win.innerWidth || doc.body.clientWidth || doc.documentElement.clientWidth,
            canvasHeight: win.innerHeight || doc.body.clientHeight || doc.documentElement.clientHeight,
            frameRate: 30,
            fontSize: '16px',
            fontFamily: 'Arial',
            rowSpacing: 10,
            avatarRadius: 20,
            avatarBorder: 6,
            contentBoxHeight: 28,
            contentBoxBorderRadius: 6,
            fontColor: '#fff',
            backgroundColor: '#fdb720',
            bulletScreenInterval: 3000
        };
    function getPixelRatio(ctx){
        var backingStore = ctx.backingStorePixelRatio ||
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return (win.devicePixelRatio || 1) / backingStore;
    }
    function strokeRoundRect(ctx, x, y, width, height, radius, lineWidth, strokeColor){
        if(2 * radius > width || 2 * radius > height){
            return;
        }
        ctx.save();
        ctx.translate(x, y);
        pathRoundRect(ctx, width, height, radius);
        ctx.lineWidth = lineWidth || 1;
        ctx.strokeStyle = strokeColor || 'black';
        ctx.stroke();
        ctx.restore();
    }
    function fillRoundRect(ctx, x, y, width, height, radius, fillColor){
        if(2 * radius > width || 2 * radius > height){
            return;
        }
        ctx.save();
        ctx.translate(x, y);
        pathRoundRect(ctx, width, height, radius);
        ctx.fillStyle = fillColor || 'black';
        ctx.fill();
        ctx.restore();
    }
    function pathRoundRect(ctx, width, height, radius){
        ctx.beginPath();
        ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
        ctx.lineTo(radius, height);
        ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
        ctx.lineTo(0, radius);
        ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
        ctx.lineTo(width - radius, 0);
        ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
        ctx.closePath();
    }
    function BulletScreen(opts){
        this.initial = false;
        this.starting = false;
        this.runTime = 0;
        this.comments = [];
        opts && this.init(opts);
        return this;
    };
    win.BulletScreen = BulletScreen;
    BulletScreen.prototype = {
        init: function(opts){
            if(this.initial){
                return this;
            }
            this.initial = true;
            for(var pro in defaults){
                this[pro] = defaults[pro];
            }
            this.configure(opts);
            this.canvas = this.canvas || doc.querySelector('canvas');
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            this.context = this.context || this.canvas.getContext('2d');
            this.pixelRatio = getPixelRatio(this.context);
            this.millisecondsPerFrame = parseInt(1000 / this.frameRate);
            this.calculations = {
                avatarDiameter: this.avatarRadius * 2,
                avatarBoxRadius: this.avatarRadius + this.avatarBorder,
                contentBoxPositionY: this.contentBoxHeight / -2,
            },
            this.font = this.fontSize + ' ' + this.fontFamily;
            this.rowHeight = Math.max(this.calculations.avatarBoxRadius * 2, this.contentBoxHeight);
            this.maxRow = Math.floor((this.canvasHeight - this.rowSpacing) / (this.rowHeight + this.rowSpacing));
            return this;
        },
        _frame: function(){
            this._render();
            this._update();
            this.timer = setTimeout(this._frame.bind(this), this.millisecondsPerFrame);
            this.runTime += this.millisecondsPerFrame;
        },
        _update: function(){
            this._updateComments();
        },
        _updateComments: function(){
            var comments = this.comments,
                len = comments.length,
                maxRow = this.maxRow,
                randomRows = [],
                randomRow = 0,
                added = false,
                cnt = 0,
                i;
            if(this.runTime % this.bulletScreenInterval < this.millisecondsPerFrame){
                added = true;
                for(i = 0; i < maxRow; i++){
                    randomRows.push(i);
                }
            }
            for(i = 0; i < len; i++){
                if(added === true){
                    if(comments[i].active === false){
                        if(maxRow-- > 0){
                            randomRow = randomRows.splice(Math.floor(Math.random() * randomRows.length), 1)[0];
                            comments[i].position.y += (this.rowHeight + this.rowSpacing) * randomRow;
                            comments[i].active = true;
                        }else{
                            added = false;
                        }
                    }
                }
                if(comments[i].active === true){
                    comments[i].position = comments[i].position.add(comments[i].velocity.mult(this.millisecondsPerFrame));
                }
                if(comments[i].position.x > -(comments[i].contentWidth + this.avatarRadius + this.avatarBorder * 2)){
                    comments[cnt++] = comments[i];
                }
            }
            comments.splice(cnt, len - cnt);
        },
        _render: function(){
            var ctx = this.context,
                comments = this.comments,
                calculations = this.calculations,
                len = comments.length,
                i;
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            for(i = 0; i < len; i++){
                if(comments[i].active === false){
                    continue;
                }
                ctx.save();
                ctx.transform(1, 0, 0, 1, comments[i].position.x * this.pixelRatio, comments[i].position.y * this.pixelRatio);
                
                ctx.beginPath();
                ctx.arc(0, 0, calculations.avatarBoxRadius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = this.backgroundColor;
                ctx.fill();

                fillRoundRect(ctx, 0, calculations.contentBoxPositionY, comments[i].contentWidth + calculations.avatarBoxRadius + this.avatarBorder, this.contentBoxHeight, this.contentBoxBorderRadius, this.backgroundColor);

                ctx.font = this.font;
                ctx.textBaseline = 'middle';
                ctx.fillStyle = this.fontColor;
                ctx.fillText(comments[i].content, calculations.avatarBoxRadius, 0);

                ctx.beginPath();
                ctx.arc(0, 0, this.avatarRadius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.strokeStyle = 'transparent';
                ctx.stroke();
                ctx.clip();
                ctx.drawImage(comments[i].img, -this.avatarRadius * this.pixelRatio, -this.avatarRadius * this.pixelRatio, calculations.avatarDiameter * this.pixelRatio, calculations.avatarDiameter * this.pixelRatio);
                ctx.restore();
            }
        },
        addComments: function(comments){
            var ctx = this.context;
            comments.forEach(function(item){
                var img = new Image(),
                    comment;
                img.onload = function(){
                    if(img.width > 0 && img.height > 0){
                        ctx.font = this.font;
                        comment = {
                            position: new Point(this.canvasWidth + Math.floor(Math.random() * 100), this.rowHeight / 2 + this.rowSpacing),
                            velocity: new Vector2(-Math.ceil(Math.random() * 5 + 10) / 100, 0),
                            active: false,
                            avatar: item.avatar,
                            content: item.content,
                            contentWidth: ctx.measureText(item.content).width,
                            img: img
                        }
                        this.comments.push(comment);
                    }
                }.bind(this);
                img.src = item.avatar;
            }.bind(this));
        },
        start: function(){
            if(this.initial){
                this.starting = true;
                this.timer = this.timer || setTimeout(this._frame.bind(this), this.millisecondsPerFrame);
            }
        },
        pause: function(){
            this.starting = false;
            clearTimeout(this.timer);
            this.timer = null;
        },
        resume: function(){
            this.start();
        },
        clear: function(){
            clearTimeout(this.timer);
            this.timer = null;
            this.context && this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.comments = [];
            this.initial = false;
            this.starting = false;
        },
        configure: function(opts){
            if(opts && typeof opts === 'object'){
                if(opts instanceof Object){
                    for(var pro in opts){
                        this[pro] = opts[pro];
                    }
                }
            }
        }
    };
})(window);