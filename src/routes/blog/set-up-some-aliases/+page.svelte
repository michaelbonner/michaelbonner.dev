<script lang="ts">
	import Seo from '../../../components/Seo.svelte';
	import { Highlight } from 'svelte-highlight';
	import bash from 'svelte-highlight/languages/bash';
	import ogImage from '../../../images/iterm-aliases-trimmed-600.webp'

	import 'svelte-highlight/styles/github-dark.css';
</script>

<Seo
	description="Aliases can speed up your development and help you focus on code"
	title="Set up some aliases | Michael Bonner"
	ogImage={ogImage}
	ogType="article"
/>

<main class="container mx-auto px-8 py-12">
	<div class="max-w-3xl prose dark:prose-invert">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="leading-relaxed text-4xl tracking-wide lg:pr-8">Set up some aliases</h1>
				</div>
			</div>
			<div class="lg:mt-32 text-lg max-w-5xl">
				<p>Bash aliases are amazing, just set them up.</p>
				<h2>What are bash aliases?</h2>
				<p>
					Bash aliases are shortcuts. They reduce the key strokes, and increase efficiency. You just
					type a short, easy to remember shortcut, and bash will execute the full command. Why type
					out{' '}
					<code>git status</code> when you could type <code>gs</code>? Whey type out
					<code>git checkout origin master</code>
					when you could just type <code>gcm</code>?
				</p>
				<h2>How to set them up</h2>
				<p>
					First, identify which version of shell you&apos;re using and where &apos;s configuration
					file is. Usually, on a mac, it&apos;s in a file at <code>~/.bash_profile</code>. I use
					zsh, so mine is at <code>~/.zshrc</code>. An easy way to test is to add a sample alias,
					and try executing it after refreshing the shell or sourcing your config file.{' '}
					<code>e.g. source ~/.zshrc</code>. I keep my aliases in a file at <code>~/.aliases</code>
					and then add{' '}
					<Highlight code={`source ~/.aliases`} language={bash} />
					<code>source ~/.aliases</code> to my <code>~/.zshrc</code>.
				</p>
				<p>
					Once you identify which file to edit, all you need to do is add something like the
					following:
				</p>
				<Highlight code={`alias gs='git status'`} language={bash} />
				<p>
					In the above example, `gs` is the text you will type, and the text in the quotes is the
					command that will be executed.
				</p>
				<h2>My aliases</h2>
				<p>Here are the aliases that I use</p>
			</div>
		</div>
	</div>
	<div class="max-w-3xl">
		<Highlight
			code={`
# general
alias ll='ls -la'
alias zshrc='vim ~/.zshrc'
alias hosts='sudo vim /etc/hosts'
alias dev='cd ~/Development'
alias projects='cd ~/Development/projects'

# git
alias mylog='git log --author="Michael Bonner" --pretty=format:"%aD : %s"'
alias gs='git status'
alias gb='git branch'
alias gpull='git pull'
alias gpo='git pull origin'
alias gp='git pull'
alias gpush='git push'
alias gf='git fetch'
alias gl="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"
alias gl2="git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
alias gcma='git checkout master'
alias gcd='git checkout development'
alias gcs='git checkout staging'
alias gcm='git checkout mike'
alias gmma='git merge master'
alias gmd='git merge development'
alias gms='git merge staging'
alias gmm='git merge mike'
alias gpma='git pull origin master'
alias gpd='git pull origin development'
alias gps='git pull origin staging'
alias gpm='git pull origin mike'
alias ga='git add .'
alias gc='git commit -m '
alias gac='git commit -am '
alias ggs='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e \"\nGIT STATUS IN $&#123;dir//\.git/&#123;\" && git status -s" ; done'
alias ggpull='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e \"\nGIT PULL IN $&#123;dir//\.git/&#123;\" && git pull" ; done'
alias gc--.='git checkout -- .'
alias gch='git checkout'
alias gclean='git reset --hard;git clean -df;'
alias ghash='git rev-parse HEAD | pbcopy'
alias grpo='git remote prune origin'
alias gt='git trim'
alias ggt='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e \"\nGIT TRIM IN $&#123;dir//\.git/&#123;\" && git trim" ; done'

# laravel
alias sup='sail up'
alias sdo='sail down'
alias pa='sail artisan'
alias mfs='sail artisan queue:clear; sail artisan migrate:fresh --seed'
alias cda='composer dump-autoload'
alias sail='./vendor/bin/sail'
alias sa='sail artisan'
alias sc='sail composer'
alias smfs='sail artisan queue:clear; sail artisan migrate:fresh --seed'

#ionic
alias ib='ionic build'
alias is='ionic serve'
alias ncoi='npx cap open ios'

#npm
alias nr='npm run'
alias nrs='npm run start'
alias nrss='npm run start-secure'
alias nrd='npm run dev'
alias nrt='npm run test'
alias nrw='npm run watch'
alias nrp='npm run prod'
alias nrb='npm run build'
alias nrl='npm run lint'
alias nrc='npm run codegen'
alias nrg='npm run generate'
alias npmout='find . -type d -name .git -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e \"\nNPM STATUS IN $&#123;dir//\.git/&#125;\" && npm out" ; done'
alias npmup='find . -type d -name '.git' -maxdepth 2 | while read dir ; do sh -c "cd $dir/ && echo -e \"\nNPM UPDATE IN $&#123;dir//\.git/&#125;\" && npm up" ; done'

#docker
alias dcu='docker-compose up'
alias dcd='docker-compose down'

# misc
alias unit="./vendor/bin/phpunit"
alias sf='sudo mdutil -E /'
alias vapor='php vendor/bin/vapor'
alias c='open . -a /Applications/Visual\ Studio\ Code.app'
alias ploys='./bin/deploy-staging.sh'
alias ployp='./bin/deploy-production.sh'
alias composerout='find . -type d -name 'vendor' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e \"\nCOMPOSER STATUS IN $&#123;dir//\.git/&#125;\" && composer out" ; done'
alias st='open . -a /Applications/Sourcetree.app'
alias mjml='./node_modules/.bin/mjml'
alias ibrew='arch -x86_64 /usr/local/bin/brew'
alias nd='netlify dev'

alias da='SwitchAudioSource -t input -s "Yeti X" && SwitchAudioSource -t output -s "Mike&apos;s AirPods Max"'
alias ba='SwitchAudioSource -t input -s "MacBook Pro Microphone" && SwitchAudioSource -t output -s "WH-1000XM3"'`}
			language={bash}
		/>
	</div>

	<div class="max-w-3xl prose dark:prose-invert mt-16">
		<p>
			Published:{` `}
			<time dateTime="2021-07-15">15 Jul 2021</time>
		</p>
		<p>
			Updated:{` `}
			<time dateTime="2022-08-10">10 Aug 2022</time>
		</p>
	</div>
</main>
