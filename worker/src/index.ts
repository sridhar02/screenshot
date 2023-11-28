export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Response {
		let response;

		const ogURl = request.url;
		const url = new URL(ogURl);
		const key = url.pathname.slice(1);

		if (request.method === 'OPTIONS') {
			response = handleOptions(request);
		} else if (request.method === 'PUT') {
			try {
				await env.MY_BUCKET.put(key, request.body);

				response = new Response(JSON.stringify({ message: 'image successfully stored', url: ogURl }));
			} catch (error) {
				console.log({ error });
				response = new Response(JSON.stringify({ error, message: 'Not able to store image' }));
			}
		} else if (request.method === 'GET') {
			const object = await env.MY_BUCKET.get(key);

			if (object === null) {
				return new Response('Object Not Found', { status: 404 });
			}

			const headers = new Headers();
			object.writeHttpMetadata(headers);
			headers.set('etag', object.httpEtag);

			return new Response(object.body, {
				headers,
			});
		}

		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		return response;
	},
};

function handleOptions(request: Request) {
	return new Response(null, {
		headers: corsHeaders,
	});
}

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
	'Access-control-allow-headers': '*',
};
