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

    let i;
    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);

    //桶的初始化
    let DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;  
    let buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);                      
        }
    }

    return arr;
}