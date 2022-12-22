<?php declare(strict_types=1);

namespace Sabr\Toolbox\Helpers;

use Cms\Classes\Page;

class FormHelper
{
    public static function getOptionsServicePages(): array
    {
        $result = [];
        $pages = Page::sortBy('baseFileName')->all();

        /**
         * @var Page $page
         */
        foreach ($pages as $page) {
            if ($page->hasComponent('resources')) {
                $component = $page->getComponentProperties('resources');

                if (isset($component['vars']['isService'])) {
                    $result[$page->baseFileName] = $page->title . ' (' . $page->baseFileName . ')';
                }
            }
        }

        return $result;
    }

    public function getServicePage(string $filename)
    {
        if ($page = Page::query()->whereFileName($filename)->first()) {
            return $page;
        }

        return null;
    }
}
