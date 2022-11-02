import 'zx/globals';

async function main() {
	await $`rm -rf dist`;

	await $`tsc --build tsconfig.build.json`;
	await $`rm dist/index.js dist/*.tsbuildinfo`;
	await $`rm -rf dist/helpers`;

	const formats = ['esm', 'cjs'];
	for await (const format of formats) {
		const flags = [
			'src/index.ts',
			'--bundle',
			`--format=${format}`,
			'--minify',
			`--outfile=dist/index.${format}.js`,
		];

		await $`esbuild ${flags}`;
	}
}

main();
