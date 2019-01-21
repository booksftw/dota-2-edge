export class TestService{

  testProp: string = 'hello';

  set testPropVal(propVal: string){
    console.log('Before '+ this.testProp);
    this.testProp = propVal;
    console.log('After ' + this.testProp);
  }

  test = function(){
    console.log('Jarvis: TESTING FROM TEST SERVICE');
  }
}
