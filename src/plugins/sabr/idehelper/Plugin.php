<?php declare(strict_types=1);

namespace Sabr\Idehelper;

use App;
use Config;
use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'IdeHelper',
            'description' => 'Make development easier with IDE helpers!',
            'author'      => 'Sergey Mikhalitsky',
            'icon'        => 'icon-code',
            'homepage'    => 'https://sabr.com.tr',
        ];
    }

    public function boot()
    {
        Config::set('ide-helper', Config::get('sabr.idehelper::config'));

        if (App::isLocal() && class_exists('\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider')) {
            App::register('\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider');
        }
    }
}
