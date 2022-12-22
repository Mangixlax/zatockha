<?php declare(strict_types=1);

namespace Sabr\Toolbox\Classes;

use Carbon\Carbon;
use Request;

class TelegramSender
{
    public static function sendMessage(array $data): void
    {
        $tgToken = env('CALLBACK_TELEGRAM_TOKEN', '');
        $tgChannel = env('CALLBACK_TELEGRAM_CHANNEL', '');

        if (!empty($tgToken) && !empty($tgChannel)) {
            $data = array_merge([
                'form_desc' => '',
                'name'      => '',
                'phone'     => '',
                'message'   => '',
            ], $data);

            if (!empty($data['phone'])) {
                $message = "<b>🔥 Новое обращение! 🔥</b> ";
                $message .= "\n<b>Форма</b>: " . (!empty($data['form_desc']) ? $data['form_desc'] : 'Не заполнено 😭');
                $message .= "\n<b>Дата</b>: " . Carbon::now('Europe/Moscow')->format('d.m.Y в H:i');
                $message .= "\n<b>Имя</b>: " . (!empty($data['name']) ? $data['name'] : 'Не заполнено 😭');
                $message .= "\n<b>Телефон</b>: " . (!empty($data['phone']) ? $data['phone'] : 'Не заполнено 😭');
                $message .= "\n<b>Сообщение</b>: " . (!empty($data['message']) ? $data['message'] : 'Не заполнено 😭');
                $message .= "\n<b>Со страницы</b>: " . Request::url();
                $tgMessage = $message;

                file_get_contents("https://api.telegram.org/bot${$tgToken}/sendMessage?chat_id={$tgChannel}&parse_mode=HTML&text=" . urlencode($tgMessage));
            }
        }
    }
}
