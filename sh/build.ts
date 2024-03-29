import shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`rm -rf dist`;

	await $`tsc --build tsconfig.build.json`;
	await $`rm -rf dist/helpers`;

	const flags = ["--bundle", "--platform=node"];
	await $`esbuild src/cjs/index.cjs --format=cjs --outfile=dist/index.cjs ${flags}`;
	await $`esbuild src/index.ts --format=esm --outfile=dist/index.mjs ${flags}`;
}

main();
