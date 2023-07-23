# VNOI Cup 2023 Qualification Rounds

Switch to English. Go to ranking page of each contest, open console and run the script in `export_ranking.js`. Rename downloads files to `ranking_r1.csv`, `ranking_r2.csv`, and `ranking_r3.csv`.

- Round 1: https://oj.vnoi.info/contest/vnoicup23_r1/ranking
- Round 2: https://oj.vnoi.info/contest/vnoicup23_r2/ranking
- Round 3: https://oj.vnoi.info/contest/vnoicup23_r3/ranking

Run `./merge_ranking` to get combined ranking of all 3 rounds.

Run `./get_tshirts.py` to get t-shirts winners. Seed is penalty of top 1.

```sh
./get_tshirts.py tshirt_candidates.csv 36105 > tshirt_winners.txt
```
