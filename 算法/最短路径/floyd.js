/* writed by Li Yu
** origin date: 2017.8
** modified date: 2020.4.9
** Floyd算法，解决最短路径问题（获取所有节点之间的最短路径）
** D邻接矩阵，P最短路径矩阵
** 算法描述：初始化D矩阵和P矩阵，写一个三重循环，判断中间（行，节点）+（节点，列）距离和
** （行，列）距离大小，如果小于，则更新D矩阵和P矩阵
** 优点：写法简单，思路清晰
** 缺点：不能有负权重，时间复杂度高，不适合网密度高的图
** 时间复杂度： O(n^3)
*/

"use strict"
function floyd() {
    var Dmat = [];//D矩阵初始化
    var i, j, k, q;
    for (i = 0; i < pnum; i++) {
        Dmat[i] = [];
        for (j = 0; j < pnum; j++) {
            Dmat[i][j] = 999999999;
        }
    }

    var bbb, fff;
    var brow1, frow1;
    for (i = 0; i < lnum; i++) {
        bbb = po[i][1];//弧段起点
        fff = po[i][2];//弧段终点
        //找对应点在data中的行号,这就是D和data的对应关系
        for (q = 0; q < pnum; q++) {
            if (p[q][0] - 1 === bbb) {
                brow1 = q;
            } else if (p[q][0] - 1 === fff) {
                frow1 = q;
            }
        }
        //更新D
        Dmat[brow1][frow1] = po[i][7];
    }
    for (i = 0; i < pnum; i++) {
        Dmat[i][i] = 0;
    }

    //P矩阵初始化
    for (i = 0; i < pnum; i++) {
        P[i] = [];
        for (j = 0; j < pnum; j++) {
            P[i][j] = j;
        }
    }

    for (k = 0; k < pnum; k++) {
        for (i = 0; i < pnum; i++) {
            for (j = 0; j < pnum; j++) {
                if (Dmat[i][j] > (Dmat[i][k] + Dmat[k][j])) {
                    Dmat[i][j] = (Dmat[i][k] + Dmat[k][j]);
                    P[i][j] = P[i][k];
                }
            }
        }
    }
}
