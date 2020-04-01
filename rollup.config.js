import { terser } from "rollup-plugin-terser";

const
	packageConfig = require('./package.json'),
	filename = process.env.FP2_FILENAME || "fingerprint2",
	globalScopeApiVariable = process.env.GLOBAL_VAR_NAME || "Fingerprint2",
	bannerText = `/*@license
* Fingerprintjs2 ${packageConfig.version} - Modern & flexible browser fingerprint library v2
* https://github.com/Valve/fingerprintjs2
* Copyright (c) 2020 Valentin Vasilyev (valentin@fingerprintjs.com)
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL VALENTIN VASILYEV BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* This software contains code from open-source projects:
* MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
*/`;

const
	config = {
		input: "fingerprint2.js",
		output: [
			{
				file: `dist/${filename}.mjs`,
				format: "esm"
			},
			{
				file: `dist/${filename}.min.mjs`,
				format: "esm",
				banner: bannerText
			},
			{
				file: `dist/${filename}.js`,
				format: "iife",
				name: globalScopeApiVariable
			},
			{
				file: `dist/${filename}.min.js`,
				format: "iife",
				name: globalScopeApiVariable,
				banner: bannerText
			}
		],
		plugins: [
			terser({
				include: [/^.+\.min\.m?js$/],
				output: {
					comments: function (node, comment) {
						var text = comment.value;
						var type = comment.type;
						if (type === 'comment2') {
							// multiline comment
							return /@license/i.test(text);
						}
					}
				}
      })
		]
	};

export default config;