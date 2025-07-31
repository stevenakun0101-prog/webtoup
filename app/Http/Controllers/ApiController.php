<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    /**
     * Hit the Mobile Legends payment API.
     *
     * @param int $id
     * @param int $zone
     * @return \Illuminate\Http\JsonResponse
     */
    public function ml($id, $zone)
    {
        // Define endpoint and headers
        $endpoint = 'https://order-sg.codashop.com/initPayment.action';
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        // Prepare the body for the POST request
        $body = http_build_query([
            'voucherPricePoint.id' => 4150,
            'voucherPricePoint.price' => 1579,
            'voucherPricePoint.variablePrice' => 0,
            'user.userId' => $id,
            'user.zoneId' => $zone,
            'voucherTypeName' => 'MOBILE_LEGENDS',
            'shopLang' => 'id_ID',
            'voucherTypeId' => 1,
            'gvtId' => 1
        ]);

        // Perform the POST request
        $response = Http::withHeaders($headers)->post($endpoint, $body);

        // Check if the request was successful
        if ($response->successful()) {
            $data = $response->json();
            return response()->json([
                'success' => true,
                'game' => 'Mobile Legends: Bang Bang',
                'id' => $id,
                'zoneId' => $zone,
                'name' => $data['confirmationFields']['username'] ?? null
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch data from Mobile Legends API.'
            ], $response->status());
        }
    }

    public function ff($id)
    {
        // Define endpoint and headers
        $endpoint = 'https://order-sg.codashop.com/initPayment.action';
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        // Prepare the body for the POST request
        $body = http_build_query([
            'voucherPricePoint.id' => 8050,
            'voucherPricePoint.price' => 1000,
            'voucherPricePoint.variablePrice' => 0,
            'user.userId' => $id,
            'voucherTypeName' => 'FREEFIRE',
            'shopLang' => 'id_ID',
            'voucherTypeId' => 1,
            'gvtId' => 1
        ]);

        // Perform the POST request
        $response = Http::withHeaders($headers)->post($endpoint, $body);

        // Check if the request was successful
        if ($response->successful()) {
            $data = $response->json();
            if (isset($data['confirmationFields']['username'])) {
                return response()->json([
                    'success' => true,
                    'game' => 'Garena Free Fire',
                    'id' => $id,
                    'name' => $data['confirmationFields']['username']
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Not found'
                ], 404);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch data from Free Fire API.'
            ], $response->status());
        }
    }

    public function valo($id)
    {
        // Define the endpoint and headers
        $endpoint = 'https://order-sg.codashop.com/initPayment.action';
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        // Prepare the body for the POST request
        $body = http_build_query([
            'voucherPricePoint.id' => 973634,
            'voucherPricePoint.price' => 56000,
            'voucherPricePoint.variablePrice' => 0,
            'user.userId' => $id,
            'voucherTypeName' => 'VALORANT',
            'voucherTypeId' => 109,
            'gvtId' => 139,
            'shopLang' => 'id_ID'
        ]);

        // Perform the POST request
        $response = Http::withHeaders($headers)->post($endpoint, $body);

        // Check if the request was successful
        if ($response->successful()) {
            $data = $response->json();

            // Handling different cases based on response
            if (isset($data['success']) && $data['success'] === true) {
                return response()->json([
                    'success' => true,
                    'game' => 'VALORANT',
                    'id' => $id,
                    'server' => 'Indonesia',
                    'name' => $data['confirmationFields']['username']
                ]);
            } elseif (isset($data['errorCode']) && $data['errorCode'] === -200) {
                return response()->json([
                    'success' => true,
                    'game' => 'VALORANT',
                    'id' => $id,
                    'name' => $data['confirmationFields']['userId']
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Not found'
                ], 404);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch data from Valorant API.'
            ], $response->status());
        }
    }

    public function la($id, $zone)
    {
        // Convert zone to lowercase for case insensitive comparison
        $zoneLC = strtolower($zone);
        $sn = '';
        $sv = 0;

        // Determine the zone and server ID
        switch (true) {
            case str_contains($zoneLC, 'miskatown'):
                $sn = 'MiskaTown';
                $sv = 500001;
                break;
            case str_contains($zoneLC, 'sandcastle'):
                $sn = 'SandCastle';
                $sv = 500002;
                break;
            case str_contains($zoneLC, 'mouthswamp'):
                $sn = 'MouthSwamp';
                $sv = 500003;
                break;
            case str_contains($zoneLC, 'redwoodtown'):
                $sn = 'RedwoodTown';
                $sv = 500004;
                break;
            case str_contains($zoneLC, 'obelisk'):
                $sn = 'Obelisk';
                $sv = 500005;
                break;
            case str_contains($zoneLC, 'newland'):
                $sn = 'NewLand';
                $sv = 500006;
                break;
            case str_contains($zoneLC, 'chaosoutpost'):
                $sn = 'ChaosOutpost';
                $sv = 500007;
                break;
            case str_contains($zoneLC, 'ironstride'):
                $sn = 'IronStride';
                $sv = 500008;
                break;
            case str_contains($zoneLC, 'crystalthornsea'):
                $sn = 'CrystalthornSea';
                $sv = 500009;
                break;
            case str_contains($zoneLC, 'fallforest'):
                $sn = 'FallForest';
                $sv = 510001;
                break;
            case str_contains($zoneLC, 'mountsnow'):
                $sn = 'MountSnow';
                $sv = 510002;
                break;
            case str_contains($zoneLC, 'nancycity'):
                $sn = 'NancyCity';
                $sv = 520001;
                break;
            case str_contains($zoneLC, 'charlestown'):
                $sn = 'CharlesTown';
                $sv = 520002;
                break;
            case str_contains($zoneLC, 'snowhighlands'):
                $sn = 'SnowHighlands';
                $sv = 520003;
                break;
            case str_contains($zoneLC, 'santopany'):
                $sn = 'Santopany';
                $sv = 520004;
                break;
            case str_contains($zoneLC, 'levincity'):
                $sn = 'LevinCity';
                $sv = 520005;
                break;
            case str_contains($zoneLC, 'milestone'):
                $sn = 'MileStone';
                $sv = 520006;
                break;
            case str_contains($zoneLC, 'chaoscity'):
                $sn = 'ChaosCity';
                $sv = 520007;
                break;
            case str_contains($zoneLC, 'twinislands'):
                $sn = 'TwinIslands';
                $sv = 520008;
                break;
            case str_contains($zoneLC, 'hopewall'):
                $sn = 'HopeWall';
                $sv = 520009;
                break;
            case str_contains($zoneLC, 'labyrinthsea'):
                $sn = 'LabyrinthSea';
                $sv = 520010;
                break;
            default:
                return response()->json([
                    'success' => false,
                    'message' => 'Not found'
                ], 404);
        }

        // Define the endpoint and headers
        $endpoint = 'https://order-sg.codashop.com/initPayment.action';
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        // Prepare the body for the POST request
        $body = http_build_query([
            'voucherPricePoint.id' => 45713,
            'voucherPricePoint.price' => 15000,
            'voucherPricePoint.variablePrice' => 0,
            'user.userId' => $id,
            'user.zoneId' => $sv,
            'voucherTypeName' => 'NETEASE_LIFEAFTER',
            'shopLang' => 'id_ID'
        ]);

        // Perform the POST request
        $response = Http::withHeaders($headers)->post($endpoint, $body);

        // Check if the request was successful
        if ($response->successful()) {
            $data = $response->json();
            return response()->json([
                'success' => true,
                'game' => 'LifeAfter',
                'id' => $id,
                'server' => $sn,
                'name' => $data['confirmationFields']['username']
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch data from LifeAfter API.'
            ], $response->status());
        }
    }

    public function gi($id)
    {
        $sn = '';
        $sv = '';

        // Convert id to string and check first digit
        $idStr = (string) $id;
        switch ($idStr[0]) {
            case '6':
                $sn = 'America';
                $sv = 'os_usa';
                break;
            case '7':
                $sn = 'Europe';
                $sv = 'os_euro';
                break;
            case '8':
                $sn = 'Asia';
                $sv = 'os_asia';
                break;
            case '9':
                $sn = 'SAR (Taiwan, Hong Kong, Macao)';
                $sv = 'os_cht';
                break;
            default:
                return response()->json([
                    'success' => false,
                    'message' => 'Bad request'
                ], 400);
        }

        // Define the endpoint and headers
        $endpoint = 'https://order-sg.codashop.com/initPayment.action';
        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        // Prepare the body for the POST request
        $body = http_build_query([
            'voucherPricePoint.id' => 116054,
            'voucherPricePoint.price' => 16500,
            'voucherPricePoint.variablePrice' => 0,
            'user.userId' => $id,
            'user.zoneId' => $sv,
            'voucherTypeName' => 'GENSHIN_IMPACT',
            'shopLang' => 'id_ID'
        ]);

        // Perform the POST request
        $response = Http::withHeaders($headers)->post($endpoint, $body);

        // Check if the request was successful
        if ($response->successful()) {
            $data = $response->json();
            return response()->json([
                'success' => true,
                'game' => 'Genshin Impact',
                'id' => $id,
                'server' => $sn,
                'name' => $data['confirmationFields']['username'] ?? 'Unknown'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch data from Genshin Impact API.'
            ], $response->status());
        }
    }
}
