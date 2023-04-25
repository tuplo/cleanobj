import "zx/globals";

async function main() {
	await $`rm -rf dist`;

	await $`tsc --build tsconfig.build.json`;
	await $`rm -rf dist/helpers`;

	const flags = ["--bundle", "--platform=node"];
	await $`esbuild src/cjs/index.cjs --format=cjs ${flags} --outfile=dist/index.cjs`;
	await $`esbuild src/index.ts --format=esm ${flags} --outfile=dist/index.mjs`;
}

main();