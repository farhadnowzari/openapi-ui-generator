# OpenAPI UI Generator

I created this repository, to make simpler to publish a monorepos customized open-api generated UI, into Gitlab pages.


## How to use it?
Each package has it's own container image published on github. The containers expect the definitions to be copied under `docs/`. Then the browser when it loads, will read the json files and will pass them to the generators. This way, you also can have more than one definition and in the UI, you can select which one, you want to display.

### Installation
There are two versions of container images will be published in each release. One will generate a `swagger` ui and the other, a `redoc` ui.

* redoc

    ```sh
    docker pull ghcr.io/farhadnowzari/openapi:1.0.0-redoc
    ```

    or to use as a base image

    ```dockerfile
    FROM ghcr.io/farhadnowzari/openapi:1.0.0-redoc
    ```

* swagger

    ```sh
    docker pull ghcr.io/farhadnowzari/openapi:1.0.0-swagger
    ```

    or to use as a base image

    ```dockerfile
    FROM ghcr.io/farhadnowzari/openapi:1.0.0-swagger
    ```

### One definition without customization
If you have only one definition, copy the `*.json`, under `/public/docs/` and rename it to `default.json`.

### One definition with customization
Now if you have some customization to the UIs, you need to also put a `settings.json` under the `/public/docs/`. The schema of `settings.json` is like this:

```json
{
    "name": "Name of your company for example",
    "logoUrl": "The logo you wanna display in the header",
    "dark": true, //This will set the theme of the header only. If true, the header will be dark, if not set or is false, the header will be in light mode.
    "docs": [
        {
            "name": "Name of your definition. e.g. Test REST service",
            "url": "The relative path to the definition json file. e.g. ./test-rest-service.json"
        }
    ]
}
```

In the configuration above, you will have one definition file with a given name. This means the `./test-rest-service.json` must appear under `/public/docs/` as well. So in the above example, the files under `/public/docs/` are as follow.

```
/public/docs/
├── settings.json
└── test-rest-service.json
```

As you see, the `default.json` in this case is not needed. `default.json` is only needed, if you do not have `settings.json`. The UIs will first look for the `settings.json` and if they cannot find it, then they will look for `default.json`. The `default.json`, should be a normal openapi definition.

### Multiple definitions
As you saw in the example above, in the `settings.json` you can have more than one `doc`. This means you can then put your definitions from different projects in one monorepo into `/public/docs` and the UI will give you a drop down to choose from in the header.

> A good practice for maintaining the settings and make your `ci/cd` lean, is to perhaps keep the `settings.json` in your repo and just copy it when running the `ci/cd` for pages under the `/public/docs/` directory.


## At the end
At the end of your `Gitlab CI/CD` pipeline where you have `pages` set to true, you need to upload `/public` as an artifact for the pages. Then everything else will be handled by gitlab itself.


## Only gitlab?
Well these packages are generic. There is no gitlab related packages hardcoded into any of them. Each package has a static react app running until `/public`. This means if your environment has a support to run a static page like this. Go on and use it. You can also use this as a base image and run it with `nginx`.