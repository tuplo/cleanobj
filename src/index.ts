// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

interface IOptions {
	ignore?: (key: string, value: unknown) => boolean;
}

export default function cleanobj<T extends Obj>(obj: T, options?: IOptions): T {
	const { ignore = () => false } = options || {};

	const ret = {} as Obj;
	for (const key of Object.keys(obj)) {
		const value = obj[key];

		if (ignore(key, value)) {
			ret[key] = obj[key];
			continue;
		}

		if (typeof value === 'undefined') continue;

		if (typeof value === 'function') continue;

		if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
			const n = cleanobj(value as Obj);
			if (Object.keys(n).length > 0) ret[key] = n;
			continue;
		}

		if (typeof value === 'string') {
			const s = value.replace(/\s+/g, ' ').trim();
			if (s.length > 0) ret[key] = s;
			continue;
		}

		if (Array.isArray(value)) {
			const o = Object.assign({} as Obj, value);
			const oc = cleanobj(o);
			const n = Object.values(oc);
			if (n.length > 0) ret[key] = n;
			continue;
		}

		ret[key] = obj[key];
	}

	return ret as T;
}
