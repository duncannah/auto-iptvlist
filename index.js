const fetch = require("node-fetch");
const $ = require("cheerio");

(async () => {
	require("fs").writeFileSync(
		require("path").join(__dirname, "./list.m3u"),
		"#EXTM3U\n" +
			(await Promise.all(
				(await Promise.all(
					$(
						"pre",
						await (await fetch(
							$(
								".image-link",
								await (await fetch(
									"https://www.daily" +
										"" +
										"i" +
										"" +
										"p" +
										"" +
										"t" +
										"" +
										"v" +
										"" +
										"list.com/europe/turkey/"
								)).text()
							)
								.first()
								.attr("href")
						)).text()
					)
						.first()
						.text()
						.split("\n")
						.filter((l) => l !== "")
						.map((l) => fetch(l))
				)).map((r) => r.text())
			))
				.map((t) =>
					t
						.replace("\r", "")
						.split("\n")
						.filter((l) => l.trim() !== "#EXTM3U" && l.trim() !== "")
						.join("\n")
				)
				.join("\n")
	);
})();
