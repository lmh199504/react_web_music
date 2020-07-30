


//格式化数字
export const formatNum = (num) => {
	if(num>10000){
		return (num / 10000).toFixed(1) + '万' 
	}else{
		return num
	}
}


//格式化歌曲时间

export const formatSongTime = (time) => {
	let min = parseInt( time / 60)
	let sec = time%60
	min = min > 9 ? min : '0' + min
	sec = sec > 9 ? sec : '0' + sec
	return min + ':' + sec
}

//检查图片是否存在
export const CheckImgExists = (imgurl) => {
    var ImgObj = new Image(); //判断图片是否存在
    ImgObj.src = imgurl;
    //加了一个onload事件，赋值成功后进行加载之后获取宽高，
    ImgObj.onload = () => {
		
        //没有图片，则返回-1
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
			console.log('图片存在')
            return imgurl      
         } else {
			 console.log('tupbc')
            return 'https://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000'
        }
    }
}

//格式化发布时间

export const formatPubTime = (time) => {
	var date = new Date(time*1000)
	let y = date.getFullYear()
	let m = date.getMonth()
	let d = date.getDay()
	return y+'-'+ (m+1>9?m+1 : '0' + (m+1)) +'-'+  (d>9?d:'0'+d)
}

export class SongFromNewDisc{
	constructor(item){
		this.songmid = item.songmid
		this.singer = item.singer
		this.title = item.songname
		this.interval = item.interval
		this.cover = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
				  // `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`
		this.src = item.src || ''
		this.checked = false
		// this.album = item.album
		this.albumName = item.albumname
	}
}