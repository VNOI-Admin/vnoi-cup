#!/usr/bin/env python3

import argparse
import csv


class Random:
    """Random number generator based on testlib"""

    seed = 3905348978240129619
    multiplier = 0x5DEECE66D
    addend = 0xB
    mask = (1 << 48) - 1
    INT_MAX = 2147483647

    def nextBits(self, bits: int) -> int:
        assert bits <= 48, "bits must be <= 48"
        self.seed = (self.seed * self.multiplier + self.addend) & self.mask
        return self.seed >> (48 - bits)

    def setSeed(self, _seed: int) -> None:
        """Sets seed by given integer"""
        _seed = (_seed ^ self.multiplier) & self.mask
        self.seed = _seed

    def next(self, n: int) -> int:
        """Returns random integer in range [0, n - 1]"""
        assert n > 0, "n must be positive"
        assert n < self.INT_MAX, "n must be less than INT_MAX"

        if (n & -n) == n:  # n is a power of 2
            return (n * self.nextBits(31)) >> 31

        limit = self.INT_MAX / n * n
        bits = self.nextBits(31)
        while bits >= limit:
            bits = self.nextBits(31)

        return bits % n

    def nextRange(self, low: int, high: int) -> int:
        """Returns random integer in range [low, high]"""
        return self.next(high - low + 1) + low


def main():
    parser = argparse.ArgumentParser(description='Get t-shirts winners')
    parser.add_argument('csv', type=str, help='Path to CSV file')
    parser.add_argument('seed', type=int, help='Seed')
    args = parser.parse_args()

    rnd = Random()
    rnd.setSeed(args.seed)

    with open(args.csv, 'r', encoding='utf8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    winners = list(map(lambda x: x['Username'], rows[:77]))

    candidates = []
    rows = rows[77:]
    for row in rows:
        if float(row['R1 Points']) > 0:
            candidates.append(row['Username'])
        if float(row['R2 Points']) > 0:
            candidates.append(row['Username'])
        if float(row['R3 Points']) > 0:
            candidates.append(row['Username'])

    for _ in range(75):
        while True:
            winner_ind = rnd.next(len(candidates))
            winner = candidates.pop(winner_ind)

            if winner in winners:
                continue

            winners.append(winner)
            break

    assert len(winners) == 152
    for winner in winners:
        print(winner)


if __name__ == '__main__':
    main()
