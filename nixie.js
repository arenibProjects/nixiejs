class Nixie{
	constructor(canvas,digits){
		this.c=canvas;
		this.ctx=this.c.getContext("2d");
		this.numDigits=digits;
		this.__val=0;
		this.digits=[];
		var that = this;
		for(var i=0;i<11;i++){
			var m = new Image();
			m.src="img/"+i+".jpg";
			this.digits.push(m);
			m.onload=function(){
				that.draw(0);
			}
		}
		this.ctx.fillRect(0,0,this.c.width,this.c.height);
	}
	draw(i){
		var that=this;
		if(i>0){
			setTimeout(function(){that.draw(i-1)},50);
			this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
		}
		else{
			this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
		}
		this.ctx.globalAlpha = 1;
		this.ctx.globalCompositeOperation = "normal";
		this.ctx.fillRect(0,0,this.c.width,this.c.height);
		if(i>0)this.ctx.globalCompositeOperation = "lighter";
		if(i>0)this.ctx.globalAlpha = 0.5;
		var number = this.__val,
			output = [],
			sNumber = number.toString();
		for(var i=0;i<sNumber.length;i+=1){
			output.push(+sNumber.charAt(i));
		}
		for(var i=output.length-1;i>-1;i--){
			var x=this.c.width-this.c.width/(this.numDigits)*(output.length-i);
			var y=(this.c.height-this.c.width/(this.numDigits)*1.94)/2;
			this.ctx.drawImage(this.digits[output[i]],x,y,this.c.width/(this.numDigits),this.c.width/(this.numDigits)*1.94)
		}
		for(var i=0;i<this.numDigits-output.length;i++){
			var x=this.c.width/(this.numDigits)*(i);
			var y=(this.c.height-this.c.width/(this.numDigits)*1.94)/2;
			this.ctx.drawImage(this.digits[10],x,y,this.c.width/(this.numDigits),this.c.width/(this.numDigits)*1.94)
		}
	}
	get value(){
		return this.__val;
	}
	set value(v){
		this.__val=v;
		this.draw(5);
	}
}