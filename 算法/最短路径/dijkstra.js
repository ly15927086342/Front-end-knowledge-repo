/* writed by Li Yu
** origin date: 2017.8
** modified date: 2020.4.9
** Dijkstra算法，解决最短路径问题（起始点到其他所有节点的最短路径）
** PP存储最短路径，例如PP1=[1,3,1,-1,2]表示1->1;1->3->2;1->3;1->3->2->5;
** dist存储最短路径值，例如dist1=[0,10,5,100000,5]表示dist1->2=10以此类推
** 算法描述：初始化一个邻接矩阵D，从起始点开始，遍历该点到其他所有点的距离，找到最短的d
** 更新dist，遍历新节点到其他节点的距离+dist是否小于dist中到其他节点的距离，如果小于，
** 更新dist，同时更新PP，直到所有节点都遍历完毕
** 缺点：只能计算某个节点到其他所有节点的最短路径，写法相对复杂
** 时间复杂度： O(n^2)
*/

"use strict"
function dijkstra(beg, fin) {
  //  console.log(beg + "," + fin);
    const maxint= 999999999;
    var Dmat = [];//D矩阵初始化
    var i, j, k, q;
    for (i = 0; i < pnum; i++) {
        Dmat[i] = [];
        for (j = 0; j < pnum; j++) {
            Dmat[i][j] = maxint;
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
    // console.log(brow1, frow1);
    for (i = 0; i < pnum; i++) {
        Dmat[i][i] = 0;
    }
    var dist = [];
    var S = [];
    var max;
    var mark2;
    for (j = 0; j < pnum; j++) {
        dist[j] = Dmat[beg][j];
        S.push("false");
        if (dist[j] == maxint) {
            PP[j] = -1;
        } else {
            PP[j] = beg;
        }
    }
    S[beg] = "true";
    for (i = 0; i < pnum; i++) {
        max = maxint;
        for (j = 0; j < pnum; j++) {
            if (S[j] == "false" && dist[j] < max) {
                max = dist[j];
                mark2 = j;
            }
        }    
        S[mark2] = "true";
        for (k = 0; k < pnum; k++) {
            if (S[k] == "false" && Dmat[mark2][k] < maxint) {
                if ((dist[mark2] + Dmat[mark2][k]) < dist[k]) {
                    dist[k] = dist[mark2] + Dmat[mark2][k];
                    PP[k] = mark2;
                }
            }
        }
    }
}