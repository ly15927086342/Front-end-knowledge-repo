/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(n^2)
** 原理：
** 代码来自：https://www.runoob.com/w3cnote/bucket-sort.html
*/ 

function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
        return arr;
    }

    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);

    //桶的初始化,设置桶内元素的默认数量为5
    let DEFAULT_BUCKET_SIZE = 5;
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize)+1; 
    let buckets = new Array(bucketCount);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (let i = 0; i < arr.length; i++) {
        let id = Math.floor((arr[i] - minValue) / bucketSize)
        let len = buckets[id].length
        if(len==0){
            buckets[id].push(arr[i])
        }else{
            let j=0
            for(;j<len;j++){
                if(buckets[id][j]>=arr[i]){
                    buckets[id].splice(j,0,arr[i])
                    break
                }
            }
            //所有数都小于arr[i]
            if(j==len){
                buckets[id].push(arr[i])
            }
        }
    }

    let id = 0
    for (let i = 0; i < buckets.length; i++) {                  
        for (let j = 0; j < buckets[i].length; j++) {
            arr[id++] = buckets[i][j];                      
        }
    }

    return arr;
}