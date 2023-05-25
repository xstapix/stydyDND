<script setup>
  import { reactive } from 'vue';
	import VDContainer from "./DND.vue";

  const data = reactive([
    {
      name: 'LOGO',
			editing: false,
			list: [],
			contextmenu: false,
			folder_name: '1_LOGO'
    },
		{
      name: 'LOGO 2',
			editing: false,
			list: [],
			contextmenu: false,
			folder_name: '2_LOGO'
    },
    {
      name: 'ops',
			editing: false,
			list: [],
			contextmenu: false,
			folder_name: '1_LOGO'
    },
		{
      name: 'test',
			editing: false,
			list: [],
			contextmenu: false,
			folder_name: '2_LOGO'
    },
		{
      img: 'https://kronadev.ru/upload/resize_cache/iblock/d3a/500_500_2/6bcnhih6a4c2uf9p1kiy4vev2mr1br46.png'
    },
		{
      img: 'https://kronadev.ru/upload/resize_cache/iblock/8bf/500_500_2/acun9zzjt2dui1xpg8it8u2l87vbuu1p.jpg'
    },
  ])

	const newName = reactive({
		text: null
	})

	const menu = reactive({
		contextmenu: false,
		clientX: null,
		clientY: null,
		index: null,
	})

	const render = reactive({
		key: 0
	})
	
  const handlerNew = () => {
		data.unshift(
			{
				name: `Новая папка ${data.length + 1}`,
				editing: false,
				list: [],
				// contextmenu: false,
				folder_name: `${data.length + 1}_${data[data.length - 1].name}`
      }
		)
		
		console.log(data);
	}

	const handlerContextmenu = (e, index) => {
		e.preventDefault()
		menu.contextmenu = true
		
		menu.clientX = e.clientX
		menu.clientY = e.clientY
		menu.data = data[index]
		menu.index = index
		console.log(index);
	}

	const handlerSave = (data) => {
		if (newName.text != '') {
			data.name = newName.text
		}
			
		data.editing = false
		newName.text = null
	}
 
	const handlerMenuEditing = () => {
		menu.contextmenu = false
		data[menu.index].editing = true
		newName.text = data[menu.index].name

		console.log(data[menu.index]);
	}

	const xx = (arr) => {
		console.log(arr);
		if (arr.length !== data.length) {
			for (let index = data.length; index--;) {
				data.splice(index, 1)
			}
	
			data.push(...arr)
			console.log('getData');
			console.log(data);
	
			setTimeout(() => {
				render.key++
			}, 500);
			
		}
	}
</script>

<template>
  <div class="DF">
    <div class="new_folder" @click="handlerNew">Создать новую папку</div>
    <VDContainer
		:key="render.key"
      :animation=true
      :data=data
      type="switch"
			@getData="(arr) => xx(arr)"
      style="width: fit-content;">
      <template v-slot:VDC="{data, index}">
				<router-link :to="`/folder/40_${data.name}`">
					<div v-if="data.name" class="folder" @contextmenu="(e) => handlerContextmenu(e, index)">
						<p>{{data.name}}</p>
					</div>
				</router-link>
				<input 
					v-if="data.editing" 
					type="text"
					v-model="newName.text"/>
				<div 
					v-if="data.editing"
					class="save" 
					@click="handlerSave(data)">OK</div>
				<div 
					v-if="data.editing" 
					class="cancel" 
					@click="() => data.editing = false">Отмена</div>
					
					<img v-if="data.img" :src="data.img" alt="">
				</template>
			</VDContainer>
		</div>
		<div 
			v-if="menu.contextmenu"
			class="contextmenu" 
			:style="{left: `${menu.clientX}px`, top: `${menu.clientY}px`}">
			<p @click="handlerMenuEditing" class="rename">Переименовать</p>
		</div>
</template>