# VNOI Cup 2024 Qualification Rounds

Switch to English. Go to ranking page of each contest, open console and run the script in `export_ranking.js`. Rename downloads files to `ranking_r1.csv` and `ranking_r2.csv`.

- Round 1: https://oj.vnoi.info/contest/vnoicup24_r1/ranking
- Round 2: https://oj.vnoi.info/contest/vnoicup24_r2/ranking

Run `./merge_ranking` to get combined ranking of all 2 rounds.

Run `./get_tshirts.py` to get t-shirts winners. Seed is penalty of top 1.

```sh
./get_tshirts.py tshirt_candidates.csv 25823 > tshirt_winners.txt
```
