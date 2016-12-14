#!/bin/bash

echo "     __________________ "
echo "*~*~| Moving on to AWS |~*~*"
echo "    |__________________|"

echo "Copying .env folder to aws so GIT_COMMIT variable exists there with correct value"
scp -i ~/my-ec2-key-pair-vediserna.pem ~/workspace/hgop_tictactoe/.env ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

echo "Copying docker-compose.yml to aws"
scp -i ~/my-ec2-key-pair-vediserna.pem ~/workspace/hgop_tictactoe/docker-compose.yml ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

echo "Running amazonscript.sh on aws"
ssh -i ~/my-ec2-key-pair-vediserna.pem ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com < ~/workspace/hgop_tictactoe/provisioning/amazonscript.sh
#cd ..
#echo "Copying .env folder to aws so GIT_COMMIT variable exists there with correct value"
#scp -i ~/Documents/keys/my-ec2-key-pair-vediserna.pem ./.env ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

#echo "Copying docker-compose.yml to aws"
#scp -i ~/Documents/keys/my-ec2-key-pair-vediserna.pem ./docker-compose.yml ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

#cd build
#echo "Running amazonscript.sh on aws"
#ssh -i ~/Documents/keys/my-ec2-key-pair-vediserna.pem ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com < ../provisioning/amazonscript.sh
