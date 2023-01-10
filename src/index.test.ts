import cleanobj from "./index";

describe("cleanobj", () => {
	it("keeps all valid values", () => {
		const obj = { foo: "bar" };
		const actual = cleanobj(obj);
		expect(actual).toStrictEqual(obj);
	});

	it.each([undefined, ""])("removes invalid primitives: %s", (baz) => {
		const obj = { foo: "bar", baz };
		const actual = cleanobj(obj);

		const expected = { foo: "bar" };
		expect(actual).toStrictEqual(expected);
	});

	it("removes invalid objects", () => {
		const obj = { foo: "bar", baz: {} };
		const actual = cleanobj(obj);

		const expected = { foo: "bar" };
		expect(actual).toStrictEqual(expected);
	});

	it.each([
		{ foo: ["foo", "", ""] },
		{ foo: ["foo", "", [""]] },
		{ foo: ["foo", "", { bar: [] }] },
		{ foo: ["foo", "", [{ bar: "" }]] },
	])("removes empty arrays", (obj) => {
		const actual = cleanobj(obj);
		const expected = { foo: ["foo"] };
		expect(actual).toStrictEqual(expected);
	});

	it("complete example", () => {
		const obj = {
			one: " ",
			two: ["", "", "", [""]],
			three: " four ",
			descriptions: ["SAMPLE SET", "", "", { foo: "", bar: null }],
			badNews: [null, "", "", "SAMPLE"],
			five: ["f ", " ", " do"],
			six: { thing: "one", zap: null, un: undefined },
			func: (foo: boolean) => foo,
			width: "",
			height: 0,
			finish: false,
			start: true,
			"alice.bob@charlie.com": "Issue #1",
		};
		const actual = cleanobj(obj);

		const expected = {
			three: "four",
			descriptions: ["SAMPLE SET", { bar: null }],
			badNews: [null, "SAMPLE"],
			five: ["f", "do"],
			six: { thing: "one", zap: null },
			height: 0,
			finish: false,
			start: true,
			"alice.bob@charlie.com": "Issue #1",
		};
		expect(actual).toStrictEqual(expected);
	});

	it("accepts an ignore function", () => {
		const obj = { foo: "bar", baz: undefined, buz: [] };
		const actual = cleanobj(obj, {
			ignore: (key, value) =>
				key === "baz" || (value as unknown[]).length === 0,
		});

		expect(actual).toStrictEqual(obj);
	});
});
