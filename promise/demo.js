const p = new Promise((res, rej) => {
	setTimeout(() => {
		const time = Date.now()
		if (time % 2 == 1) {
			res("异步任务执行成功...")
		} else {
			rej("异步任务执行失败...")
		}
	}, 1000)
}).catch(err => {
})

// p.then(
// 	val=>{
// 		console.log(val)
// 	},err=>{
// 		console.log(err)
// })

function do1() {
	const p = new Promise((res, rej) => {
		setTimeout(() => {
			rej("do1 reject...")
		}, 1000)
	})
	return p
}

function do2() {
	const p = new Promise((res, rej) => {
		setTimeout(() => {
			res("do2 finish...")
		}, 1100)
	})
	return p
}

function do3() {
	const p = new Promise((res, rej) => {
		setTimeout(() => {
			res("do3 finish...")
		}, 1200)
	})
	return p
}

// 异步任务，哪怕等待时间是0,也得等下面微队列任务执行完毕后才能执行
setTimeout(() => {
	console.log('this is time out print...')
}, 0);
new Promise((res,rej)=>{
	for(i=0;i<5000000;i++) res('micro task finish...')
}).then(res=>{console.log(res)}) // then的逻辑加入微任务队列，它无论如何都会比同期的宏任务队列先执行