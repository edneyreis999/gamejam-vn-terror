import catalog from '../design/public-api.json' with {type:'json'};
export const {pluginId, version} = catalog;
function field(node) {
  const type = ['file','select'].includes(node.editorType)?node.editorType:node.type === 'string' && /^#[0-9a-f]{6}$/i.test(node.default) ? 'color' : node.type;
  const fields = node.fields || node.items?.fields;
  return {...node, type, min:node.min ?? 0, max:node.max ?? 4096,
    ...(fields ? {fields:Object.fromEntries(fields.map(item => [item.key, field(item)]))} : {})};
}
export const schema = Object.fromEntries(catalog.parameters.map(node => [node.key, field(node)]));
export const defaults = (node=schema) => Object.fromEntries(Object.entries(node).map(([key,value]) => [key, structuredClone(value.default)]));
export const approvedRecipe = defaults();
export const external = [];
export function entries(node=schema,prefix='') {
  return Object.entries(node).flatMap(([key,value]) => {
    const path = prefix + '/' + key;
    return [{...value,path,owner:pluginId}, ...(value.fields ? entries(value.fields,path+(value.type==='array'? '/{index}' : '')) : [])];
  });
}
export function decode(value) {

  if(typeof value==='string') {try{return decode(JSON.parse(value));}catch{return value;}}

  if(Array.isArray(value))return value.map(decode);

  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decode(v)]));

  return value;

}

export function validate(value,node,path='') {
  if(node.enum && !node.enum.includes(value))throw Error(path+': opção inválida');
  if(node.type==='string' && typeof value!=='string')throw Error(path+': esperado texto');
  if(node.type==='array') {
    if(!Array.isArray(value))throw Error(path+': esperada lista');
    const images=new Set();
    for(const [i,item]of value.entries()){
      validate(item,{type:'struct',fields:node.fields},path+'/'+i);
      for(const key of Object.keys(node.fields))if(item[key]===undefined)throw Error(path+'/'+i+': campo obrigatório '+key);
      if(images.has(item.Image))throw Error(path+': imagem duplicada '+item.Image);images.add(item.Image);
    }
  }else if(node.type==='struct') {

    if(!value||typeof value!=='object'||Array.isArray(value))throw Error(path+': esperado objeto');

    for(const [k,v] of Object.entries(value)) {if(!node.fields[k])throw Error(path+'/'+k+': parâmetro desconhecido');validate(v,node.fields[k],path+'/'+k);}

  }else if(node.type==='boolean'&&typeof value!=='boolean')throw Error(path+': esperado booleano');

  else if(node.type==='number'&&(!Number.isFinite(value)||value<node.min||value>node.max))throw Error(path+': número fora do intervalo');

  else if(node.type==='color'&&!/^#[0-9a-f]{6}$/i.test(value))throw Error(path+': use #RRGGBB');

  else if(node.type==='select'&&!node.options.includes(value))throw Error(path+': opção inválida');

  else if(node.type==='file'&&(typeof value!=='string'||!value||/[/\\:]|\.\./.test(value)))throw Error(path+': use nome de arquivo local sem extensão');

}
