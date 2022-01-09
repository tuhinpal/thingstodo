# Things to do

Get things to do of a place. Powered by Google's Things to do and Cloudflare worker. NOTE: This project doesn't use google's API.

### Endpoints:

#### 1. Search Places

- Request:

```
Method: GET
URL: https://<your-app>.workers.dev/serach?query={query}
```

- Response:

```json
{
    "message": "Place searched!",
    "query": "kolkata",
    "count": 2,
    "data": [
        {
            "id": "0cvw9",
            "name": "Kolkata",
            "description": "City in India",
            "api_path": "/place/0cvw9"
        },
        {...}
    ],
    "error": {
        "message": "No errors",
        "data": []
    }
}
```

```
Method: GET
URL: https://<your-app>.workers.dev/place/{id}
```

#### 2. Get all things to do of a place

- Request:

```
Method: GET
URL: https://<your-app>.workers.dev/place/{id}
```

- Response:

```json
{
    "message": "Things to do fetched!",
    "id": "0cvw9",
    "name": "Kolkata",
    "description": "West Bengal capital home to Mother Teresa's tomb, British-colonial architecture & art galleries.",
    "about": "Kolkata (formerly Calcutta) is the capital of India's West Bengal state. Founded as an East India Company trading post, it was India's capital under the British Raj from 1773–1911. Today it’s known for its grand colonial architecture, art galleries and cultural festivals. It’s also home to Mother House, headquarters of the Missionaries of Charity, founded by Mother Teresa, whose tomb is on site.",
    "data": [
        {
            "name": "Victoria Memorial",
            "description": "Grand museum for art & Indian history",
            "images": {
                "default": "https://encrypted-tbn0.gstatic.com/images?q",
                "1920x1080": "https://encrypted-tbn0.gstatic.com/images?q=w1920-h1080-k-no",
                "1280x720": "https://encrypted-tbn0.gstatic.com/images?q=w1280-h720-k-no",
                "640x360": "https://encrypted-tbn0.gstatic.com/images?q=w640-h360-k-no",
                "180x120": "https://encrypted-tbn0.gstatic.com/images?q=w180-h120-k-no"
            },
            "coordinates": {
                "lat": 22.5448082,
                "long": 88.3425578
            },
            "rating": {
                "star": 4.5734096,
                "raters": 54809
            },
            "map": "https://www.google.com/maps/place/22.5448082,88.3425578/@22.5448082,88.3425578,100z"
        },
        {...}
    ],
    "error": {
        "message": "No errors",
        "data": []
    }
}
```

### Deploy :

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tuhinpal/thingstodo)

#### After deployed do these steps:

- Open [Cloudflare Worker](https://workers.cloudflare.com "Cloudflare Worker") Page
- Click on KV
- In `Namespace Name` section Type a Name & Click on `Add`, a namespace will created.
- Now go back to worker main page, here you will see that your created worker listed there, click on that.
- Click on `Settings` > `Variables`
- In `KV Namespace Bindings` section click on `Add Binding`
- Write `CACHE` in Variable name & select your recently created Namespace for KV namespace.

### Credits

Credits go to [Google](https://google.com) for organizing the data and [Clouflare](https://clouflare.com) for providing the worker.

### License & Copyright :

- This Project is [Apache-2.0](https://github.com/tuhinpal/thingstodo/blob/main/LICENSE) Licensed
- Copyright 2022 by [Tuhin Kanti Pal](https://github.com/tuhinpal)

<br><a href="https://www.buymeacoffee.com/tuhinkpal"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=tuhinkpal&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"></a>
