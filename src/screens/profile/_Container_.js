<Container>
      
        <Content>

       

          <View style={{flex: 0, padding: 35}}>

          <Image
          style={styles.logo}
        source={{
          uri: 'https://images.lenouvelliste.com/app/logo.png',
        }}
      />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text style={styles.loginText}>Connectez-vous</Text>

              <TextInput
                placeholder="E-mail, username"
                placeholderTextColor="#9b9b9b"
                keyboardType={'email-address'}
                onChangeText={this.handlEmail}
                value={this.state.email}
                style={styles.input}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                blurOnSubmit={false}
                autoCapitalize="none"
              />
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  secureTextEntry={this.state.isPasswordSecured}
                  placeholder="Password"
                  placeholderTextColor="#9b9b9b"
                  onChangeText={this.handlePassword}
                  value={this.state.password}
                  style={styles.input}
                />
                <Icon
                  style={styles.icon}
                  name={
                    this.state.isPasswordSecured
                      ? 'visibility-off'
                      : 'visibility'
                  }
                  size={25}
                  color="#D3D3D3"
                  onPress={() => {
                    this.setState({
                      isPasswordSecured: !this.state.isPasswordSecured,
                    });
                  }}
                />
              </View>

              <Button title="Je me connecte" onPress={this.login} />

              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  marginTop: 30,
                }}
                onPress={() => {
                  console.log('>>>Forgot Pressed<<<');
                  this.props.navigation.navigate('Forgot');
                }}>
                <Text style={styles.forgot}>Forgot your password ?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  marginTop: 15,
                }}
                onPress={() => {
                  this.props.navigation.navigate('Register');
                }}>
                <Text style={styles.noAcc}>No account yet ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>