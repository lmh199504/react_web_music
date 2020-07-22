


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