/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(2*n*k) // 2表示进桶和出桶各需要n次，k表示最大的位数
** 原理：利用不同区间保存数字，然后再吐出
** 代码来自：https://www.runoob.com/w3cnote/radix-sort.html
** 适用于位数比较少的数
*/ 

function radixSort(arr, maxDigit) {
    let mod = 10;
    let dev = 1;
    let counter = []
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(let j = 0; j < arr.length; j++) {
            let bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        let pos = 0;
        for(let j = 0; j < counter.length; j++) {
            let value = null;
            if(counter[j]!=null) {
                // 这里只能用!=，不能用!==，因为如果[].shift()应该是undefined
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}