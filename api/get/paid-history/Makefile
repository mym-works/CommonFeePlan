plugin-install:
			sls plugin install --name serverless-domain-manager

local-invoke:
			sls invoke local --function main --aws-profile mym-lab --path lib/test_data.json

deploy: 
			sls deploy --aws-profile mym-lab

domain:
			sls create_domain --aws-profile mym-lab