//一个楼里的作业，收所有作业的最短路径

let line = '3,10,3|0,0,1;0,9,1;1,8,1'
[n,m,p] = line.split('|')[0].split(',').map(item=>parseInt(item))
let pos = new Array(p)
for(let i=0;i<p;i++){
    pos[i] = []
}
let cur = []
line.split('|')[1].split(';').forEach(floor=>{
    cur.length = []
    cur = floor.split(',').map(item=>parseInt(item))
    pos[cur[2]].push([cur[0],cur[1]])
})
pos = pos.sort((a,b)=>a[0]<b[0])
function path(arr){
    if(arr.length==0)return 0
    let now = [0,0]
    let pathAcc = 0
    let len = 0//一行的文件数
    newArr = [].concat(arr)
    while(newArr.length>0){
        pathAcc += (newArr[0][0]-now[0])
        now = [newArr[0][0],now[1]]
        len = 0
        for(let i=0;i<newArr.length;i++){
            if(newArr[i]==newArr[0]){
                len++
            }else{
                break
            }
        }
        let max = 0
        let dd = 0
        newArr.slice(0,len).forEach(item=>{
            if(Math.abs(item[1]-now[1])>max){
                dd = item[1]
                max = Math.abs(item[1]-now[1])
            }
        })
        newArr.splice(0,len)
        pathAcc += max
        now[1] = dd
        if(dd<m/2){
            now[1] = 0
            pathAcc += dd
        }else{
            now[1] = m-1
            pathAcc += m-1-dd
        }
    }
    if(now[0]!=n-1){
        pathAcc += n-1-now[0]
        now[0] = n-1
    }
    if(now[1]==m-1){
        return pathAcc+m-1+n-1
    }else{
        return pathAcc+n-1
    }
}
let len = 0
pos.forEach(arr=>{
    len+=path(arr)
})
console.log(len)