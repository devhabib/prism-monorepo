#!/bin/bash

# 1. Clean
rm -rf dist

# 2. Build
npx nx build prism-core --configuration=production
npx nx build prism-theme --configuration=production

# 3. Publish Core
cd dist/libs/prism-core
npm publish --access public
cd ../../..

# 4. Publish Theme
cd dist/libs/prism-theme
npm publish --access public
cd ../../..

echo "✅ Published @devynelogic/prism-core and @devynelogic/prism-theme"
