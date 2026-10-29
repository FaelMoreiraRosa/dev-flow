#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/16e8a5f6f924a4ebfcc547b740a61c12fb447bc20c231f7224a45f41654d0b20/contract';
import endContract from '../../snapshots/16e8a5f6f924a4ebfcc547b740a61c12fb447bc20c231f7224a45f41654d0b20/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/dd2aa0484a196a1fa07da68a5bfe1afc452b96c9b30a7bb223f1117c9ddc5659/contract';
import startContract from '../../snapshots/dd2aa0484a196a1fa07da68a5bfe1afc452b96c9b30a7bb223f1117c9ddc5659/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
