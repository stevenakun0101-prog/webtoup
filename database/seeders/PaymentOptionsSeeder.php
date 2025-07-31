<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentOptionsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('payment_options')->insert([
            [
                'key_name' => 'dana',
                'label' => 'DANA',
                'no_rek' => '085157746677',
                'atas_nama' => 'STEVEN LIE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key_name' => 'gopay',
                'label' => 'GoPay',
                'no_rek' => '085157746677',
                'atas_nama' => 'STEVEN LIE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key_name' => 'ovo',
                'label' => 'OVO',
                'no_rek' => '085157746677',
                'atas_nama' => 'STEVEN LIE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key_name' => 'bca_va',
                'label' => 'BCA Virtual Account',
                'no_rek' => '4141224284',
                'atas_nama' => 'STEVEN LIE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key_name' => 'mandiri_va',
                'label' => 'Mandiri Virtual Account',
                'no_rek' => '1200013671826',
                'atas_nama' => 'STEVEN LIE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key_name' => 'seabank_va',
                'label' => 'SeaBank Virtual Account',
                'no_rek' => '901152172987',
                'atas_nama' => 'STEVEN LIE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key_name' => 'qris',
                'label' => 'QRIS',
                'no_rek' => '-',
                'atas_nama' => 'CUNGSSTORE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
