import {readFileSync,writeFileSync} from 'node:fs';
const root='planos/tasks/prototype-feedback-refinement/';
const base=JSON.parse(readFileSync(root+'task-13-request-physical-first.json','utf8'));
for(const [variant,reduced] of [['supernatural-first',true],['bad',true],['branch-destroy',false],['return-only',false]]){
 const request=structuredClone(base);
 request.requestId='refinement-'+variant+'-20260925-01';
 request.scenario={id:'refinement-'+variant,profile:reduced?'1920x1080-reduced':'1280x720-normal',variant,configuration:'candidate-file1-port18726'};
 request.claims[0].variant=variant;request.claims[0].source.variant=variant;
 request.freshness.reason='Distinct required '+variant+' path on the integrated candidate, through public input and compatible own archives where declared.';
 writeFileSync(root+'task-13-request-'+variant+'.json',JSON.stringify(request,null,2)+'\n');
}
