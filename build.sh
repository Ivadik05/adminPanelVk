# current branch name
branchName=$(git branch | grep '\*' | awk -F ' ' '{print $2}')

echo "cd /root/build"
cd /root/build

############ INITIALIZATION ###########

npm config set registry http://sonatype-nexus.livetex.ru/nexus/content/repositories/livetex-npm-group/ -g
npm config set email aleksandr.mi@livetex.ru -g
npm config set _auth d2lkZ2V0czpIaDU3Mmc4 -g
npm config set always-auth true -g

echo "npm install"
npm install

echo "cp src/settings-example.ts src/settings.ts"
cp src/settings-example.ts src/settings.ts


############## TESTS ##############

echo "npm run test"
tests=$(npm run test | tee /dev/null)
echo "$tests"

fails=$(echo "$tests" | grep 'FAIL' | wc -l)
if [ $fails -ne 0 ]; then
    echo "TESTS FAILED, BUILD CANCELLED"
    exit 1;
fi


############# BUILD #############

if [ $branchName = "develop" ] ; then
  echo "npm run build:dev"
  build=$(npm run build:dev | tee /dev/null)
else
  echo "npm run build:prod"
  build=$(npm run build:prod | tee /dev/null)
fi

echo "$build"

fails=$(echo "$build" | grep 'ERROR' | wc -l)
if [ $fails -ne 0 ]; then
    echo "BUILD FAILED"
    exit 1;
fi
