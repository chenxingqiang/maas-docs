#!/usr/bin/env node
/**
 * 链接验证脚本
 * 检查文档中的所有链接是否有效
 */

const fs = require('fs');
const path = require('path');

class LinkValidator {
  constructor() {
    this.invalidLinks = [];
    this.checkedFiles = new Set();
  }

  /**
   * 提取Markdown文件中的链接
   */
  extractLinks(content, filePath) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const [fullMatch, title, url] = match;
      
      // 跳过Markdown格式说明中的示例链接
      if (url === '链接' || url === 'alt') {
        continue;
      }
      
      links.push({
        title: title.trim(),
        url: url.trim(),
        file: filePath,
        line: content.substring(0, match.index).split('\n').length
      });
    }

    return links;
  }

  /**
   * 验证单个链接
   */
  validateLink(link) {
    const { url, file, line, title } = link;

    // 跳过外部链接
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
      return { valid: true, reason: 'external' };
    }

    // 处理锚点链接
    if (url.includes('#')) {
      const [filePath, anchor] = url.split('#', 2);
      const fullPath = path.resolve(path.dirname(file), filePath);
      
      if (fs.existsSync(fullPath)) {
        return { valid: true, reason: 'anchor' };
      } else {
        return { valid: false, reason: 'file_not_found' };
      }
    }

    // 处理相对路径
    const fullPath = path.resolve(path.dirname(file), url);
    
    if (fs.existsSync(fullPath)) {
      return { valid: true, reason: 'file_exists' };
    } else {
      return { valid: false, reason: 'file_not_found' };
    }
  }

  /**
   * 扫描目录中的所有Markdown文件
   */
  scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (file.endsWith('.md')) {
        this.scanFile(fullPath);
      }
    }
  }

  /**
   * 扫描单个文件
   */
  scanFile(filePath) {
    if (this.checkedFiles.has(filePath)) {
      return;
    }
    
    this.checkedFiles.add(filePath);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinks(content, filePath);
      
      for (const link of links) {
        const result = this.validateLink(link);
        
        if (!result.valid) {
          this.invalidLinks.push({
            ...link,
            reason: result.reason
          });
        }
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
    }
  }

  /**
   * 生成报告
   */
  generateReport() {
    console.log('🔍 链接验证报告');
    console.log('='.repeat(60));
    console.log(`📁 已检查文件: ${this.checkedFiles.size} 个`);
    console.log(`🔗 发现无效链接: ${this.invalidLinks.length} 个`);
    console.log('='.repeat(60));

    if (this.invalidLinks.length === 0) {
      console.log('✅ 所有链接都有效！');
      return true;
    }

    console.log('❌ 无效链接列表:');
    this.invalidLinks.forEach((link, index) => {
      console.log(`\n${index + 1}. ${link.title}`);
      console.log(`   文件: ${link.file}:${link.line}`);
      console.log(`   链接: ${link.url}`);
      console.log(`   原因: ${link.reason}`);
    });

    return false;
  }

  /**
   * 运行验证
   */
  run() {
    console.log('🚀 开始链接验证...');
    
    // 扫描docs目录
    if (fs.existsSync('docs')) {
      this.scanDirectory('docs');
    }
    
    // 扫描根目录的Markdown文件
    const rootFiles = fs.readdirSync('.').filter(file => file.endsWith('.md'));
    rootFiles.forEach(file => this.scanFile(file));
    
    const isValid = this.generateReport();
    process.exit(isValid ? 0 : 1);
  }
}

// 运行验证
if (require.main === module) {
  const validator = new LinkValidator();
  validator.run();
}

module.exports = LinkValidator;
