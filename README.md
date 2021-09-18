Deployed application address: http://o70.rp.ru:6174

You can view logs here: http://o70.rp.ru:5601

Next for developers.

You can insert heartbeat into input in Logstash configuration file to check Logstash availability.

heartbeat {
  interval => 5
  message  => 'Hello from Logstash 💓'
}
